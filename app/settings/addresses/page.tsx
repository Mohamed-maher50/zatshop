import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { AddressesTab } from "@/components/settings/AddressesTab";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/settings/addresses`);
  }
  return <AddressesTab />;
};

export default page;
