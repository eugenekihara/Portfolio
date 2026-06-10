import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const role = (session.user as { role?: string }).role;
  if (role !== "admin") {
    return null;
  }

  return session;
}
