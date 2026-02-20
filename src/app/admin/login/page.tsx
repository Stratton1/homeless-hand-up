import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=invalid");
    }

    throw error;
  }
}

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  const params = await searchParams;
  const showError = params.error === "invalid" || params.error === "missing";

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-brand-warm/10 p-8">
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Admin Sign In</h1>
        <p className="text-sm text-brand-gray mb-6">
          Sign in with your support worker/admin credentials.
        </p>

        {showError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Invalid email or password.
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-warm focus:outline-none focus:ring-2 focus:ring-brand-warm/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-warm focus:outline-none focus:ring-2 focus:ring-brand-warm/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-brand-warm to-brand-warm-dark px-4 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-brand-warm/20 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
