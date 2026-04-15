import { auth } from "@clerk/nextjs/server";
import { UsersClient } from "./client";

async function getUsers(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch { return []; }
}

export default async function UsersPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const users = await getUsers(token ?? "");
  return <UsersClient users={users} />;
}