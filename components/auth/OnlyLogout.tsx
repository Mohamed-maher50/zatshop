"use client";

import { useSession } from "next-auth/react";

const OnlyLogout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "authenticated") return null;

  return <>{children}</>;
};

export default OnlyLogout;
