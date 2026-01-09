import { ResetPasswordForm } from "@/components/auth/ResetNewPasswordForm";
import { Suspense } from "react";
export default async function page() {
  return (
    <Suspense fallback={<div>Loading RestPasswordForm...</div>}>
      <ResetPasswordForm />;
    </Suspense>
  );
}
