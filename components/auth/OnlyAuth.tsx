"use client";
import { useSession } from "next-auth/react";

export default function AuthOnly({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === "unauthenticated") return null;

  return <>{children}</>;
}
