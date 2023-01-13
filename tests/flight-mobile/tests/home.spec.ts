import { test, expect } from '@playwright/test';
import { mockCurrentDate } from '../scripts/date';

test.describe('As a user, I can search flight schedule filtered by airport, date, seat class, and number of passengers so that I can focus on flight schedule that matches my criteria', () => {
  test('Given that I am a user, I can see search form inputs with default values in my first visit', async ({
    page,
  }) => {
    await mockCurrentDate(page);

    await page.goto('/');

    await expect(
      page.getByRole('button', { name: 'Asal Jakarta (JKT)' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Tujuan Denpasar / Bali (DPS)' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Pergi Jumat, 13 Jan 2023' })
    ).toBeVisible();

    const pulangPergiCheckbox = page.getByRole('checkbox', {
      name: 'Pulang Pergi?',
    });

    await expect(pulangPergiCheckbox).not.toBeChecked();

    const pulangButton = page.getByRole('button', {
      name: 'Pulang Sabtu, 14 Jan 2023',
    });

    await expect(pulangButton).not.toBeVisible();

    await pulangPergiCheckbox.check({ force: true });

    await expect(pulangButton).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Penumpang 1 Dewasa • 0 Anak • 0 Bayi' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Kelas Ekonomi' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Cari Tiket Pesawat' })
    ).toBeVisible();
  });
});
