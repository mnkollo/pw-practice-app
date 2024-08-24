import { test } from '@playwright/test';
import { PageManager } from '../Page/pageManager';
import { NavigationPage } from '../Page/navigationPage';


test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:4200/');
})
test('naviage to form page', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
})
test('parameterized methods', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('Greg Wilson', 'Pickles@test.com', true);
})
test('parameterized methods test', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutsPage().submitBasicFormEmailAndPassword('test@test.com', 'Welcome1', true);
})
test('Common Datepicker', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1,9)
})