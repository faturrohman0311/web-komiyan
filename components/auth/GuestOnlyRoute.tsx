"use client";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function GuestOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // kalau sudah login jangan render login page
  if (user) return null;

  return <>{children}</>;
}
