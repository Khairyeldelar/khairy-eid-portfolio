import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
export const LOCAL_ADMIN_OPEN_ID = "local-admin";
export const ADMIN_PASSWORD_SETTING_KEY = "__admin_password_hash";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyAdminPassword(password: string, storedHash?: string | null) {
  if (!storedHash) {
    const expected = process.env.ADMIN_PASSWORD ?? "";
    return Boolean(expected) && safeEqual(password, expected);
  }
  const [, salt, expectedHex] = storedHash.split("$");
  if (!salt || !expectedHex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return safeEqual(derived.toString("hex"), expectedHex);
}

export function verifyLocalAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  return Boolean(expectedUsername) && safeEqual(username, expectedUsername) && Boolean(password);
}
