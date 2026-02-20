import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

function mustEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  const email = mustEnv("ADMIN_BOOTSTRAP_EMAIL").toLowerCase();
  const password = mustEnv("ADMIN_BOOTSTRAP_PASSWORD");
  const fullName = process.env.ADMIN_BOOTSTRAP_NAME || "Initial Administrator";

  if (password.length < 12) {
    throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("admin_users").upsert(
    {
      email,
      password_hash: passwordHash,
      full_name: fullName,
      role: "super_admin",
      is_active: true,
    },
    { onConflict: "email" }
  );

  if (error) {
    throw new Error(`Failed to bootstrap admin: ${error.message}`);
  }

  console.log(`Admin bootstrap complete for ${email}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
