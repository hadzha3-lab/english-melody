const { test, expect } = require('@playwright/test');

test('all twelve modes render without JavaScript errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8000');
  const modes = page.locator('#modes button');
  await expect(modes).toHaveCount(12);
  for (let index = 0; index < 12; index++) {
    await modes.nth(index).click();
    await expect(page.locator('#game .line').first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('catalog filters by title', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000');
  await page.locator('#search').fill('Blue');
  await expect(page.locator('#catalog button')).toHaveCount(1);
  await page.locator('#catalog button').click();
  await expect(page.locator('#song')).toContainText('Blue Sky');
});
