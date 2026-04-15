import { auth } from "@clerk/nextjs/server";
import { SupportClient } from "./client";

async function getSupportStats(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/support/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

async function getSupportCases(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/support`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch { return []; }
}

export default async function SupportPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const [stats, cases] = await Promise.all([
    getSupportStats(token ?? ""),
    getSupportCases(token ?? ""),
  ]);
  return <SupportClient cases={cases} stats={stats} />;
}