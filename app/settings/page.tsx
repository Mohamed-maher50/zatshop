import ProfileTab from "@/components/settings/ProfileTab";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/settings`);
  }
  return <ProfileTab />;
};

export default page;
