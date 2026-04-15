"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export function UserActions({ userId, isActive }: { userId: string; isActive: boolean }) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleToggle = async () => {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ isActive: !isActive }),
        }
      );
      if (res.ok) { setConfirm(false); router.refresh(); }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Acciones</h2>
      <div className="space-y-2">
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
            isActive
              ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
              : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
          }`}
        >
          {loading ? "Actualizando..." : confirm ? "Confirmar accion" : isActive ? "Desactivar usuario" : "Activar usuario"}
        </button>
        {confirm && (
          <button
            onClick={() => setConfirm(false)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
      </div>
      {confirm && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          {isActive ? "El usuario no podra iniciar sesion" : "El usuario podra iniciar sesion nuevamente"}
        </p>
      )}
    </div>
  );
}