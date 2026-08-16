import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { systemRouter } from "./_core/systemRouter";
import { sdk } from "./_core/sdk";
import { ADMIN_PASSWORD_SETTING_KEY, hashAdminPassword, verifyAdminPassword, verifyLocalAdminCredentials, LOCAL_ADMIN_OPEN_ID } from "./localAdmin";
import { storagePut } from "./storage";
import {
  createContent,
  deleteContactMethod,
  deleteContent,
  deleteSetting,
  listAllContactMethods,
  listAllContent,
  listContactMethods,
  listPublishedContent,
  listSettings,
  updateContent,
  upsertContactMethod,
  upsertSetting,
  upsertUser,
  getPrivateSetting,
  savePrivateSetting,
} from "./db";

const contentInput = z.object({
  kind: z.enum(["project", "article", "tutorial"]), slug: z.string().min(1).max(180),
  titleAr: z.string().min(1).max(255), titleEn: z.string().min(1).max(255),
  excerptAr: z.string().optional(), excerptEn: z.string().optional(), bodyAr: z.string().optional(), bodyEn: z.string().optional(),
  category: z.string().optional(), tools: z.string().optional(), projectUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(), imageKey: z.string().optional(), thumbnailUrl: z.string().optional(), thumbnailKey: z.string().optional(), published: z.boolean().default(true), sortOrder: z.number().int().default(0),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    adminLogin: publicProcedure.input(z.object({ username: z.string(), password: z.string() })).mutation(async ({ input, ctx }) => {
      if (!verifyLocalAdminCredentials(input.username, input.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }
      const passwordSetting = await getPrivateSetting(ADMIN_PASSWORD_SETTING_KEY);
      if (!(await verifyAdminPassword(input.password, passwordSetting?.value))) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }
      try {
        await upsertUser({
        openId: LOCAL_ADMIN_OPEN_ID,
        name: "Khairy Eid Ali",
        loginMethod: "local-admin",
        role: "admin",
          lastSignedIn: new Date(),
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      }
      const sessionToken = await sdk.createSessionToken(LOCAL_ADMIN_OPEN_ID, { name: "Admin" });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });
      return { success: true } as const;
    }),
    changeAdminPassword: adminProcedure.input(z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(8), confirmPassword: z.string().min(8) })).mutation(async ({ input }) => {
      if (input.newPassword !== input.confirmPassword) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Passwords do not match" });
      }
      const passwordSetting = await getPrivateSetting(ADMIN_PASSWORD_SETTING_KEY);
      if (!(await verifyAdminPassword(input.currentPassword, passwordSetting?.value))) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect" });
      }
      await savePrivateSetting(ADMIN_PASSWORD_SETTING_KEY, await hashAdminPassword(input.newPassword));
      return { success: true } as const;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  content: router({
    published: publicProcedure.input(z.object({ kind: z.enum(["project", "article", "tutorial"]).optional() }).optional()).query(({ input }) => listPublishedContent(input?.kind)),
    contactMethods: publicProcedure.query(() => listContactMethods()),
    settings: publicProcedure.query(() => listSettings()),
  }),
  admin: router({
    content: router({
      list: adminProcedure.query(() => listAllContent()),
      create: adminProcedure.input(contentInput).mutation(({ input }) => createContent(input)),
      update: adminProcedure.input(contentInput.extend({ id: z.number().int() })).mutation(({ input }) => { const { id, ...values } = input; return updateContent(id, values); }),
      remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteContent(input.id)),
    }),
    settings: router({
      list: adminProcedure.query(() => listSettings()),
      save: adminProcedure.input(z.object({ settingKey: z.string().min(1), valueAr: z.string().optional(), valueEn: z.string().optional(), value: z.string().optional() })).mutation(({ input }) => upsertSetting(input)),
      remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteSetting(input.id)),
    }),
    contactMethods: router({
      list: adminProcedure.query(() => listAllContactMethods()),
      save: adminProcedure.input(z.object({ id: z.number().int().optional(), type: z.string().min(1), label: z.string().min(1), value: z.string().min(1), icon: z.string().optional(), visible: z.boolean().default(true), sortOrder: z.number().int().default(0) })).mutation(({ input }) => upsertContactMethod(input)),
      remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteContactMethod(input.id)),
    }),
    media: router({
      upload: adminProcedure.input(z.object({ fileName: z.string().min(1), mimeType: z.string().min(1), base64: z.string().min(1) })).mutation(async ({ input, ctx }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
        return storagePut(`portfolio/${ctx.user.id}/${Date.now()}-${safeName}`, buffer, input.mimeType);
      }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
