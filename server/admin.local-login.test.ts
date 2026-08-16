import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("local admin login", () => {
  it("accepts the configured admin credentials through the API", async () => {
    const responseHeaders: Record<string, string> = {};
    const caller = appRouter.createCaller({
      user: undefined,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        cookie: (_name: string, value: string) => {
          responseHeaders.session = value;
        },
      } as unknown as TrpcContext["res"],
    });

    const result = await caller.auth.adminLogin({
      username: process.env.ADMIN_USERNAME ?? "",
      password: process.env.ADMIN_PASSWORD ?? "",
    });

    expect(result.success).toBe(true);
    expect(responseHeaders.session).toBeTruthy();
  });
});
