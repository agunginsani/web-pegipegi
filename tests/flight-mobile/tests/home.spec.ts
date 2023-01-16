import { test, expect } from '@playwright/test';
import { mockCurrentDate } from '../scripts/date';

test.beforeEach(async ({ page }) => {
  await mockCurrentDate(page);
  await page.goto('/');
});

test('As a user, I can see `Cari Tiket Pesawat` and navigation back to Pegipegi homepage on the header.', async ({
  page,
}) => {
  await expect(
    page.getByRole('heading', { name: 'Cari Tiket Pesawat', level: 1 })
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Back to Pegipegi.com homepage' })
  ).toHaveAttribute('href', 'https://stg.pegipegi.com');
});

test.describe('As a user, I can search flight schedule filtered by airport, date, seat class, and number of passengers so that I can focus on flight schedule that matches my criteria', () => {
  test('Given that I am a user, I can see search form inputs with default values in my first visit', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Asal Jakarta (JKT)' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Tujuan Denpasar / Bali (DPS)' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Pergi Jumat, 13 Jan 2023' })
    ).toBeVisible();

    await expect(
      page.getByRole('checkbox', { name: 'Pulang Pergi?' })
    ).not.toBeChecked();

    await expect(
      page.getByRole('button', { name: /^Pulang/ })
    ).not.toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Penumpang 1 Dewasa • 0 Anak • 0 Bayi' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Kelas Ekonomi' })
    ).toBeVisible();

    // await expect(
    //   page.getByRole('link', { name: 'Cari Tiket Pesawat' })
    // ).toBeVisible();
  });

  test('Given that I am a user, I can change Pergi or Pulang input value', async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: 'Pergi Jumat, 13 Jan 2023' })
      .click();

    await expect(
      page.getByRole('heading', {
        name: 'Jakarta To Denpasar / Bali',
        level: 1,
      })
    ).toBeVisible();
  });
});
