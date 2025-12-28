import { Container } from "@/components/Container";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen flex justify-center items-center">
      <Container>{children}</Container>
    </main>
  );
}
