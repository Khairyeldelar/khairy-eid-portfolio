import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("admin password change", () => {
  const adminUser = {
    id: 1,
    openId: "local-admin",
    name: "Khairy Eid Ali",
    email: null,
    loginMethod: "local-admin",
    role: "admin" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const caller = () => appRouter.createCaller({
    user: adminUser,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  });

  it("rejects mismatched confirmation before changing anything", async () => {
    await expect(caller().auth.changeAdminPassword({
      currentPassword: process.env.ADMIN_PASSWORD ?? "admin123",
      newPassword: "new-secure-password",
      confirmPassword: "different-password",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a wrong current password", async () => {
    await expect(caller().auth.changeAdminPassword({
      currentPassword: "definitely-wrong-password",
      newPassword: "new-secure-password",
      confirmPassword: "new-secure-password",
    })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
