import { auth } from "@clerk/nextjs/server";
import { ProvidersClient } from "./client";

async function getProviders(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch { return []; }
}

async function getProviderStats(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

export default async function ProvidersPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const [providers, stats] = await Promise.all([
    getProviders(token ?? ""),
    getProviderStats(token ?? ""),
  ]);

  return <ProvidersClient providers={providers} stats={stats} />;
}