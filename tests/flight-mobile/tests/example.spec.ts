import { test, expect } from "@playwright/test";

test("home page has `Promo Banners` text", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Promo Banners")).toBeVisible();
});
