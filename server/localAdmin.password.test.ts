import { describe, expect, it } from "vitest";
import { hashAdminPassword, verifyAdminPassword } from "./localAdmin";

describe("admin password hashing", () => {
  it("verifies a generated password hash and rejects a different password", async () => {
    const hash = await hashAdminPassword("new-secure-password");
    expect(hash.startsWith("scrypt$")).toBe(true);
    await expect(verifyAdminPassword("new-secure-password", hash)).resolves.toBe(true);
    await expect(verifyAdminPassword("wrong-password", hash)).resolves.toBe(false);
  });
});
