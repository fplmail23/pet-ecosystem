"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-indigo-600">Pet Ecosystem</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/servicios" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Servicios</Link>
          <Link href="/contacto" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Contacto</Link>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/portal/dashboard" className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Mi portal</Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm text-gray-600 hover:text-indigo-600">Iniciar sesion</Link>
              <Link href="/sign-up" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                Registrarse gratis
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 bg-white flex flex-col gap-4">
          <Link href="/servicios" className="text-sm text-gray-600">Servicios</Link>
          <Link href="/contacto" className="text-sm text-gray-600">Contacto</Link>
          {isSignedIn ? (
            <Link href="/portal/dashboard" className="text-sm text-indigo-600 font-medium">Mi portal</Link>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-gray-600">Iniciar sesion</Link>
              <Link href="/sign-up" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full text-center">Registrarse gratis</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}