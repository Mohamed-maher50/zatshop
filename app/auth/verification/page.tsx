import { VerificationForm } from "@/components/auth/VerificationForm";
import { Suspense } from "react";

export default () => (
  <Suspense fallback={<div>loading Verification Form....</div>}>
    <VerificationForm />
  </Suspense>
);
