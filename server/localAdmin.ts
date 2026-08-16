import { timingSafeEqual } from "node:crypto";

export const LOCAL_ADMIN_OPEN_ID = "local-admin";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyLocalAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUsername || !expectedPassword) return false;
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}
