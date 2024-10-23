import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("HomePage tests", () => {
  test("can view homepage correctly without and accessibility errors", async ({
    page,
  }) => {
    await page.goto(`/`);
    await expect(page.locator('h1:has-text("React Exercise")')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("main")
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
