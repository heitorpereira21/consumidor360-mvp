import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, hash] = storedHash.split(":");
  const hashBuffer = Buffer.from(hash, "hex");
  const derivedBuffer = scryptSync(password, salt, KEY_LENGTH);

  if (hashBuffer.length !== derivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashBuffer, derivedBuffer);
}
