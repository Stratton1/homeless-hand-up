import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type AdminRole = "super_admin" | "support_worker" | "viewer";

type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
};

export class InvalidCredentialsError extends AuthError {
  static type = "CredentialsSignin";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          throw new InvalidCredentialsError();
        }

        const supabase = getSupabaseAdminClient();
        const { data, error } = await supabase
          .from("admin_users")
          .select("id,email,password_hash,full_name,role,is_active")
          .eq("email", email)
          .eq("is_active", true)
          .limit(1)
          .maybeSingle();

        if (error) {
          throw new Error(`Admin lookup failed: ${error.message}`);
        }

        if (!data) {
          throw new InvalidCredentialsError();
        }

        const adminUser = data as AdminUserRow;
        const passwordValid = await bcrypt.compare(password, adminUser.password_hash);
        if (!passwordValid) {
          throw new InvalidCredentialsError();
        }

        await supabase
          .from("admin_users")
          .update({ last_login_at: new Date().toISOString() })
          .eq("id", adminUser.id);

        return {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.full_name,
          role: adminUser.role,
          adminUserId: adminUser.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.adminUserId = user.adminUserId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as AdminRole | undefined) ?? "viewer";
        session.user.adminUserId =
          (token.adminUserId as string | undefined) ?? "";
      }
      return session;
    },
  },
});
