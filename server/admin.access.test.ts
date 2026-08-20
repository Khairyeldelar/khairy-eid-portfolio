import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type TestUser = NonNullable<TrpcContext["user"]>;

function contextFor(role: "admin" | "user"): TrpcContext {
  const user: TestUser = {
    id: role === "admin" ? 1 : 2,
    openId: role === "admin" ? "owner-open-id" : "visitor-open-id",
    name: role === "admin" ? "Khairy Eid Ali" : "Visitor",
    email: `${role}@example.com`,
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin access control", () => {
  it("rejects a regular authenticated user from the admin content list", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.admin.content.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an admin context to reach the admin content list", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    const content = await caller.admin.content.list();
    expect(Array.isArray(content)).toBe(true);
    expect(content).toEqual(expect.arrayContaining([
      expect.objectContaining({ kind: "project", slug: "can-you-survive" }),
      expect.objectContaining({ kind: "project", slug: "podcast-mix" }),
      expect.objectContaining({ kind: "project", slug: "music-montage" }),
    ]));
  });
});
