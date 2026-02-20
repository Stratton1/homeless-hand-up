import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: "super_admin" | "support_worker" | "viewer";
    adminUserId?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "super_admin" | "support_worker" | "viewer";
      adminUserId: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "super_admin" | "support_worker" | "viewer";
    adminUserId?: string;
  }
}
