import { test, expect } from '../fixtures';
import { testData } from '../utils/testData';

const { static: staticOption, searchable, custom } = testData.dropdownOptions;

test.describe('Dropdown Tests', () => {
  test('@smoke TC-005 should select value from static dropdown', async ({ dropdownPage }) => {
    await dropdownPage.selectStaticOption(staticOption);
    const selected = await dropdownPage.getStaticSelectedValue();
    expect(selected).toBe(staticOption);
  });

  test('@functional TC-006 should search and select value from searchable dropdown', async ({ dropdownPage }) => {
    await dropdownPage.searchAndSelect(searchable);
    const inputVal = await dropdownPage.getSearchInputValue();
    expect(inputVal).toBe(searchable);
  });

  test('@regression TC-007 should select value from custom dropdown', async ({ dropdownPage }) => {
    await dropdownPage.selectFromCustomDropdown(custom);
    const selected = await dropdownPage.getCustomDropdownSelected();
    expect(selected).toBe(custom);
  });

});
