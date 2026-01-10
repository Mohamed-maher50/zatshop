import { Container } from "@/components/Container";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex justify-center py-10 sm:items-center max-sm:pt-8">
      <Container className="max-sm:w-full max-sm:px-4">{children}</Container>
    </main>
  );
}
