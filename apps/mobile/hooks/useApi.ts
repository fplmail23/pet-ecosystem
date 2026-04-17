import { useAuth } from "@clerk/clerk-expo";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useApi() {
  const { getToken } = useAuth();

  const request = async (path: string, options: RequestInit = {}) => {
    const token = await getToken();
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  };

  return {
    get: (path: string) => request(path),
    post: (path: string, body: any) => request(path, { method: "POST", body: JSON.stringify(body) }),
    patch: (path: string, body: any) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  };
}