import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ProviderActions } from "./actions";

async function getProvider(id: string, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

const TYPE_LABELS: Record<string, string> = {
  CLINIC: "Clinica", STORE: "Tienda", WALKER: "Paseador",
  GROOMING: "Grooming", DAYCARE: "Daycare", BOARDING: "Boarding", OTHER: "Otro"
};

const STATUS_STYLES: Record<string, string> = {
  PENDING_REVIEW: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  SUSPENDED: "bg-orange-100 text-orange-800",
  INACTIVE: "bg-gray-100 text-gray-800",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: "Pendiente de revision", APPROVED: "Aprobado",
  REJECTED: "Rechazado", SUSPENDED: "Suspendido", INACTIVE: "Inactivo"
};

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getToken } = await auth();
  const token = await getToken();
  const provider = await getProvider(id, token ?? "");

  if (!provider) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Proveedor no encontrado</p>
        <Link href="/dashboard/providers" className="text-indigo-600 text-sm mt-2 inline-block">Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/dashboard/providers" className="text-gray-400 hover:text-gray-600 text-sm">← Proveedores</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">{provider.tradeName}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{provider.tradeName}</h1>
                {provider.legalName && <p className="text-sm text-gray-500 mt-1">{provider.legalName}</p>}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[provider.status] ?? "bg-gray-100"}`}>
                {STATUS_LABELS[provider.status] ?? provider.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Tipo:</span><span className="font-medium ml-1">{TYPE_LABELS[provider.providerType] ?? provider.providerType}</span></div>
              <div><span className="text-gray-500">Ciudad:</span><span className="font-medium ml-1">{provider.city ?? "—"}</span></div>
              <div><span className="text-gray-500">Email:</span><span className="font-medium ml-1">{provider.email ?? "—"}</span></div>
              <div><span className="text-gray-500">Telefono:</span><span className="font-medium ml-1">{provider.phone ?? "—"}</span></div>
              <div><span className="text-gray-500">Tax ID:</span><span className="font-medium ml-1">{provider.taxId ?? "—"}</span></div>
              <div><span className="text-gray-500">Facturacion:</span><span className="font-medium ml-1">{provider.billingType}</span></div>
            </div>
            {provider.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">{provider.description}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Propietario</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-indigo-600">
                  {provider.owner?.firstName?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {provider.owner?.firstName ?? ""} {provider.owner?.lastName ?? ""}
                </p>
                <p className="text-xs text-gray-500">{provider.owner?.email}</p>
              </div>
            </div>
          </div>

          {provider.reviewNotes && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <p className="text-sm font-medium text-amber-800 mb-1">Notas de revision</p>
              <p className="text-sm text-amber-700">{provider.reviewNotes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ProviderActions providerId={provider.id} currentStatus={provider.status} token="" />
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Informacion</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Registrado</span>
                <span className="text-gray-900">{new Date(provider.createdAt).toLocaleDateString("es")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Servicios</span>
                <span className="text-gray-900">{provider.services?.length ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sucursales</span>
                <span className="text-gray-900">{provider.branches?.length ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Documentos</span>
                <span className="text-gray-900">{provider.documents?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}