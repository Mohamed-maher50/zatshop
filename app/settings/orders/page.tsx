import { OrderFilters } from "@/components/settings/order-filters";
import { OrdersTab } from "@/components/settings/OrdersTab";
import { Orders } from "@/features/orders/api/api";

const page = async ({ searchParams }: { searchParams: Promise<string> }) => {
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
