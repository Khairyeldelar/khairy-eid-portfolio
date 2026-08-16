import { and, asc, eq, not } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { contentItems, contactMethods, InsertUser, siteSettings, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  for (const field of ["name", "email", "loginMethod"] as const) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getContentBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(contentItems).where(eq(contentItems.slug, slug)).limit(1);
  return rows[0];
}

export async function listPublishedContent(kind?: "project" | "article" | "tutorial") {
  const db = await getDb();
  if (!db) return [];
  const where = kind ? and(eq(contentItems.published, true), eq(contentItems.kind, kind)) : eq(contentItems.published, true);
  return db.select().from(contentItems).where(where).orderBy(asc(contentItems.sortOrder), asc(contentItems.createdAt));
}

export async function listAllContent() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contentItems).orderBy(asc(contentItems.kind), asc(contentItems.sortOrder), asc(contentItems.createdAt));
}

export async function createContent(input: typeof contentItems.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(contentItems).values(input);
  const rows = await db.select().from(contentItems).where(eq(contentItems.slug, input.slug)).limit(1);
  return rows[0];
}

export async function updateContent(id: number, input: Partial<typeof contentItems.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(contentItems).set(input).where(eq(contentItems.id, id));
  const rows = await db.select().from(contentItems).where(eq(contentItems.id, id)).limit(1);
  return rows[0];
}

export async function deleteContent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(contentItems).where(eq(contentItems.id, id));
  return { success: true } as const;
}

export async function listSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteSettings).where(not(eq(siteSettings.settingKey, "__admin_password_hash"))).orderBy(asc(siteSettings.settingKey));
}

export async function getPrivateSetting(settingKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, settingKey)).limit(1);
  return rows[0];
}

export async function savePrivateSetting(settingKey: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(siteSettings).values({ settingKey, value }).onDuplicateKeyUpdate({ set: { value } });
}

export async function upsertSetting(input: typeof siteSettings.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(siteSettings).values(input).onDuplicateKeyUpdate({ set: { valueAr: input.valueAr, valueEn: input.valueEn, value: input.value } });
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, input.settingKey)).limit(1);
  return rows[0];
}

export async function deleteSetting(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(siteSettings).where(eq(siteSettings.id, id));
  return { success: true } as const;
}

export async function listContactMethods() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMethods).where(eq(contactMethods.visible, true)).orderBy(asc(contactMethods.sortOrder));
}

export async function listAllContactMethods() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMethods).orderBy(asc(contactMethods.sortOrder));
}

export async function upsertContactMethod(input: typeof contactMethods.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  if (input.id) {
    await db.update(contactMethods).set(input).where(eq(contactMethods.id, input.id));
  } else {
    await db.insert(contactMethods).values(input);
  }
  const rows = await db.select().from(contactMethods).where(eq(contactMethods.id, input.id ?? 0)).limit(1);
  return rows[0];
}

export async function deleteContactMethod(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(contactMethods).where(eq(contactMethods.id, id));
  return { success: true } as const;
}
