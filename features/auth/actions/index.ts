"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session";
import { createSessionToken, verifyAdminPassword } from "@/lib/auth/token";

export async function login(password: unknown) {
  // Slow down brute-force attempts
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    return { success: false };
  }

  const token = createSessionToken();
  if (!token) {
    return { success: false };
  }

  await setSessionCookie(token);
  return { success: true };
}

export async function logout() {
  await clearSessionCookie();
  redirect("/xfa/admin/login");
}
