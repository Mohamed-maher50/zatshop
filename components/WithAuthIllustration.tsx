import Image from "next/image";
import { ReactNode } from "react";

const WithAuthIllustration = ({
  children,
  url,
}: {
  children: ReactNode;
  url?: string;
}) => {
  return (
    <>
      {children}

      <div className="relative hidden h-full bg-muted md:block">
        <Image
          src={url || "/authImage.png"}
          width={550}
          height={560}
          alt="Authentication illustration"
          className="  h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </>
  );
};

export default WithAuthIllustration;
