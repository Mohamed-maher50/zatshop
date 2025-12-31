import { Container } from "@/components/Container";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen ">
      <Container>{children}</Container>
    </main>
  );
}
