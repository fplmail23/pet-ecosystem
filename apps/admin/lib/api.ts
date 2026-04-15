const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://137.184.208.148";

export async function fetchAPI(path: string, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}