import { test, expect } from '@playwright/test';

test.skip('home page has `Cari Tiket Pesawat` text', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Cari Tiket Pesawat' })
  ).toBeVisible();
});
