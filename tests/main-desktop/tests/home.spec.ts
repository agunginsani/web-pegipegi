import { test, expect } from '@playwright/test';
import { mockCurrentDate } from '../scripts/date';

test.beforeEach(async ({ page }) => {
  await mockCurrentDate(page);
  await page.goto('/');
});

test.describe('As a user, I can search bus schedule filtered by pickpoint, date, seat class, and number of passengers so that I can focus on bus schedule that matches my criteria', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('tab', { name: 'Bus & Travel' }).click();
  });

  test('Given that I am a user, I can see search form inputs with default values in my first visit', async ({
    page,
  }) => {
    await expect(page.getByRole('textbox', { name: 'Asal' })).toHaveValue(
      'Jakarta'
    );
    await expect(page.getByRole('textbox', { name: 'Tujuan' })).toHaveValue(
      'Bandung'
    );
    await expect(page.getByRole('textbox', { name: 'Penumpang' })).toHaveValue(
      '1 Kursi'
    );
    await expect(page.getByRole('textbox', { name: 'Pergi' })).toHaveValue(
      '14 Jan 2023'
    );
    await expect(page.getByRole('textbox', { name: 'Pulang' })).toBeVisible();
    await expect(
      page.getByLabel('Pulang').getByRole('checkbox')
    ).not.toBeChecked();
  });

  test('Given that I am a user, I can change Asal or Tujuan input value', async ({
    page,
  }) => {
    await page.getByRole('textbox', { name: 'Asal' }).click({ force: true });
    await page.getByRole('textbox', { name: 'Asal' }).fill('Malang');
    await expect(
      page.getByRole('option', { name: 'Malang' }).first()
    ).toBeVisible();
    await page.getByRole('option', { name: 'Malang' }).first().click();
    await expect(page.getByRole('textbox', { name: 'Asal' })).toHaveValue(
      'Malang'
    );

    await page.getByRole('textbox', { name: 'Tujuan' }).click({ force: true });
    await page.getByRole('textbox', { name: 'Tujuan' }).fill('Jogja');
    await expect(
      page.getByRole('option', { name: 'Yogyakarta' }).first()
    ).toBeVisible();
    await page.getByRole('option', { name: 'Yogyakarta' }).first().click();
    await expect(page.getByRole('textbox', { name: 'Tujuan' })).toHaveValue(
      'Yogyakarta'
    );
  });

  test('Given that I am a user, I can change Pergi or Pulang input value', async ({
    page,
  }) => {
    await page.getByRole('textbox', { name: 'Pergi' }).click({ force: true });
    await page.getByRole('button', { name: '16 Januari 2023' }).click();
    await expect(page.getByRole('textbox', { name: 'Pergi' })).toHaveValue(
      '16 Jan 2023'
    );

    await page.getByRole('textbox', { name: 'Pulang' }).click({ force: true });
    await page.getByRole('button', { name: '20 Januari 2023' }).click();
    await expect(page.getByRole('textbox', { name: 'Pulang' })).toHaveValue(
      '20 Jan 2023'
    );
    await expect(page.getByLabel('Pulang').getByRole('checkbox')).toBeChecked();

    await page.getByRole('textbox', { name: 'Pergi' }).click({ force: true });
    await page.getByRole('button', { name: '21 Januari 2023' }).click();
    await expect(page.getByRole('textbox', { name: 'Pergi' })).toHaveValue(
      '21 Jan 2023'
    );
    await expect(page.getByRole('textbox', { name: 'Pulang' })).toBeEmpty();
    await page.getByRole('button', { name: '22 Januari 2023' }).click();
    await expect(page.getByRole('textbox', { name: 'Pulang' })).toHaveValue(
      '22 Jan 2023'
    );
  });

  test('Given that I am a user, I can change Penumpang input value', async ({
    page,
  }) => {
    await page
      .getByRole('textbox', { name: 'Penumpang' })
      .click({ force: true });
    await expect(page.getByRole('button', { name: 'Increment' })).toBeVisible();
    await page.getByRole('button', { name: 'Increment' }).click();
    await expect(page.getByRole('textbox', { name: 'Penumpang' })).toHaveValue(
      '2 Kursi'
    );
    await page.getByRole('button', { name: 'Increment' }).click();
    await page.getByRole('button', { name: 'Increment' }).click();
    await expect(page.getByRole('textbox', { name: 'Penumpang' })).toHaveValue(
      '4 Kursi'
    );
  });

  test('Given that I am a user, I should be redirected to the correct search result page on search submit', async ({
    page,
  }) => {
    await page.getByRole('textbox', { name: 'Asal' }).click({ force: true });
    await page.getByRole('textbox', { name: 'Asal' }).fill('Malang');
    await page.getByRole('option', { name: 'Malang Kota' }).first().click();

    await page.getByRole('textbox', { name: 'Tujuan' }).click({ force: true });
    await page.getByRole('textbox', { name: 'Tujuan' }).fill('Jogja');
    await page.getByRole('option', { name: 'Yogyakarta Kota' }).first().click();

    await page.getByRole('textbox', { name: 'Pergi' }).click({ force: true });
    await page.getByRole('button', { name: '16 Januari 2023' }).click();
    await page.getByRole('textbox', { name: 'Pulang' }).click({ force: true });
    await page.getByRole('button', { name: '20 Januari 2023' }).click();

    await page
      .getByRole('textbox', { name: 'Penumpang' })
      .click({ force: true });
    await page.getByRole('button', { name: 'Increment' }).click();

    await page.getByRole('button', { name: 'Cari Bus & Travel' }).click();
    expect(page.url()).toContain(
      '/departure?pax=2&date=16-01-2023.20-01-2023&from=TVLK_c103&to=TVLK_c87'
    );
  });
});
