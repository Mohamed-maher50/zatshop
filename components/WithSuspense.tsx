import { AppRoutes } from "@/.next/types/routes";
import { ComponentType, ReactNode, Suspense } from "react";

const WithSuspense = <P extends object>(
  Component: ComponentType<P>,
  Loading: ReactNode
) => {
  return async (props: PageProps<AppRoutes>) => {
    const query = await props.searchParams;
    const params = JSON.stringify(query);
    return (
      <Suspense key={params.toString()} fallback={Loading}>
        <Component {...(props as P)} />
      </Suspense>
    );
  };
};

export default WithSuspense;
