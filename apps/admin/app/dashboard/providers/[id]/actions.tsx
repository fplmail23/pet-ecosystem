"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface Props {
  providerId: string;
  currentStatus: string;
  token: string;
}

export function ProviderActions({ providerId, currentStatus }: Props) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleAction = async (status: string) => {
    if (status === "REJECTED" || status === "SUSPENDED") {
      setPendingAction(status);
      setShowNotes(true);
      return;
    }
    await executeAction(status, "");
  };

  const executeAction = async (status: string, reviewNotes: string) => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${providerId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, reviewNotes }),
        }
      );
      if (res.ok) {
        setShowNotes(false);
        setNotes("");
        setPendingAction(null);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Acciones</h2>
      <div className="space-y-2">
        {currentStatus !== "APPROVED" && (
          <button
            onClick={() => handleAction("APPROVED")}
            disabled={loading}
            className="w-full bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Aprobar proveedor
          </button>
        )}
        {currentStatus !== "SUSPENDED" && currentStatus !== "REJECTED" && (
          <button
            onClick={() => handleAction("SUSPENDED")}
            disabled={loading}
            className="w-full bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            Suspender
          </button>
        )}
        {currentStatus === "PENDING_REVIEW" && (
          <button
            onClick={() => handleAction("REJECTED")}
            disabled={loading}
            className="w-full bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            Rechazar
          </button>
        )}
        {(currentStatus === "SUSPENDED" || currentStatus === "REJECTED") && (
          <button
            onClick={() => handleAction("APPROVED")}
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Reactivar
          </button>
        )}
      </div>

      {showNotes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas de revision (requerido)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Explica el motivo..."
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => executeAction(pendingAction!, notes)}
              disabled={loading || !notes.trim()}
              className="flex-1 bg-gray-900 text-white rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Confirmar"}
            </button>
            <button
              onClick={() => { setShowNotes(false); setPendingAction(null); setNotes(""); }}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}