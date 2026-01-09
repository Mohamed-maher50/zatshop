import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { OrderFilters } from "@/components/settings/order-filters";
import { OrdersTab } from "@/components/settings/OrdersTab";
import { Orders } from "@/features/orders/api/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: { searchParams: Promise<string> }) => {
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/settings/orders`);
  }
  const searchParamsFields = await searchParams;
  const search = new URLSearchParams(searchParamsFields);
  const ordersResponse = await Orders.getAll(`?${search}`);
  const orders = ordersResponse.data.data;

  return (
    <>
      <OrderFilters />
      <OrdersTab orders={orders} />;
    </>
  );
};

export default page;
