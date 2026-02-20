import { expect, test } from "@playwright/test";

test("core legal pages are reachable", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page).toHaveTitle(/Homeless Hand Up/i);

  await page.goto("/terms");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/cookies");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("where-to-spend page renders supermarket section", async ({ page }) => {
  await page.goto("/where-to-spend");
  await expect(
    page.getByRole("heading", { name: /Supermarkets & Grocers/i })
  ).toBeVisible();
});

test("admin route redirects unauthenticated users to login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});
