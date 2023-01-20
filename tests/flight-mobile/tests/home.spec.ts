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
      page.getByRole('link', { name: 'Asal Jakarta (JKT)' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Tujuan Bali / Denpasar (DPS)' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Pergi Jumat, 13 Jan 2023' })
    ).toBeVisible();

    await expect(page.getByLabel('Pulang Pergi?')).not.toBeChecked();

    await expect(page.getByRole('link', { name: 'Pulang' })).not.toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Penumpang 1 Dewasa • 0 Anak • 0 Bayi' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Kelas Ekonomi' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Cari Tiket Pesawat' })
    ).toBeVisible();
  });

  test('Given that I am a user, I can change Awal or Tujuan input value', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Asal Jakarta (JKT)' }).click();

    await expect(
      page.getByRole('textbox', { name: 'Cari kota atau bandara' })
    ).toBeVisible();

    await page
      .getByRole('textbox', { name: 'Cari kota atau bandara' })
      .fill('juanda');

    await page
      .getByRole('button')
      .filter({ hasText: /juanda/i })
      .click();

    await expect(
      page.getByRole('link', { name: 'Asal Surabaya (SUB)' })
    ).toBeVisible();

    await page
      .getByRole('link', { name: 'Tujuan Bali / Denpasar (DPS)' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Cari kota atau bandara' })
    ).toBeVisible();

    await page
      .getByRole('textbox', { name: 'Cari kota atau bandara' })
      .fill('kualanamu');

    await page
      .getByRole('button')
      .filter({ hasText: /kualanamu/i })
      .click();

    await expect(
      page.getByRole('link', { name: 'Tujuan Medan (KNO)' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Swap' }).click();

    await expect(
      page.getByRole('link', { name: 'Asal Medan (KNO)' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Tujuan Surabaya (SUB)' })
    ).toBeVisible();
  });

  test('Given that I am a user, I can change Pergi or Pulang input value', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Pergi Jumat, 13 Jan 2023' }).click();
    await page.getByRole('button', { name: '14 Januari 2023' }).click();
    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(
      page.getByRole('link', { name: 'Pergi Sabtu, 14 Jan 2023' })
    ).toBeVisible();

    await page.getByLabel('Pulang Pergi?').check({ force: true });

    await page
      .getByRole('link', { name: 'Pulang Minggu, 15 Jan 2023' })
      .click();

    await page.getByRole('button', { name: '16 Januari 2023' }).click();

    await page.getByRole('button', { name: 'Simpan' }).click();

    await expect(
      page.getByRole('link', { name: 'Pulang Senin, 16 Jan 2023' })
    ).toBeVisible();
  });
});
