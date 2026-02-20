export type AdminRole = "viewer" | "support_worker" | "super_admin";

const ROLE_RANK: Record<AdminRole, number> = {
  viewer: 1,
  support_worker: 2,
  super_admin: 3,
};

export function isAdminRole(value: unknown): value is AdminRole {
  return value === "viewer" || value === "support_worker" || value === "super_admin";
}

export function hasRequiredRole(
  userRole: unknown,
  minimumRole: AdminRole
): boolean {
  if (!isAdminRole(userRole)) {
    return false;
  }

  return ROLE_RANK[userRole] >= ROLE_RANK[minimumRole];
}
