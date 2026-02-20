import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no critical axe violations", async ({ page }) => {
  await page.goto("/");

  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((violation) => violation.impact === "critical");

  expect(blocking).toEqual([]);
});
