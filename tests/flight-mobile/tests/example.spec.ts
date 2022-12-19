import { test, expect } from "@playwright/test";

test("home page has `Cari Tiket Pesawat` text", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Cari Tiket Pesawat")).toBeVisible();
});
