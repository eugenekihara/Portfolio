import { NextAuthProvider } from "@/components/providers/next-auth-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
