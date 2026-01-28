import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { requireEnv } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "srvm_admin";

type SessionPayload = {
  sub: "admin";
  exp: number; // epoch seconds
};

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(data: string) {
  const secret = requireEnv("AUTH_SECRET");
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSessionToken(payload: SessionPayload) {
  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = sign(body);
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
    if (payload.sub !== "admin") return null;
    if (typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie() {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 12; // 12h
  const token = createSessionToken({ sub: "admin", exp });
  (await cookies()).set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(exp * 1000),
  });
}

export async function clearAdminSessionCookie() {
  (await cookies()).set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function isAdminRequestAuthed() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  return !!verifySessionToken(token);
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = requireEnv("ADMIN_USERNAME");
  const expectedPass = requireEnv("ADMIN_PASSWORD");
  return username === expectedUser && password === expectedPass;
}


