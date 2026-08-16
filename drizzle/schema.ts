import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const contentItems = mysqlTable("content_items", {
  id: int("id").autoincrement().primaryKey(),
  kind: mysqlEnum("kind", ["project", "article", "tutorial"]).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  excerptAr: text("excerptAr"),
  excerptEn: text("excerptEn"),
  bodyAr: text("bodyAr"),
  bodyEn: text("bodyEn"),
  category: varchar("category", { length: 80 }),
  tools: text("tools"),
  projectUrl: varchar("projectUrl", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 1000 }),
  imageKey: varchar("imageKey", { length: 500 }),
  published: boolean("published").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 120 }).notNull().unique(),
  valueAr: text("valueAr"),
  valueEn: text("valueEn"),
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const contactMethods = mysqlTable("contact_methods", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 60 }).notNull(),
  label: varchar("label", { length: 120 }).notNull(),
  value: varchar("value", { length: 500 }).notNull(),
  icon: varchar("icon", { length: 60 }),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = typeof contentItems.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type ContactMethod = typeof contactMethods.$inferSelect;
