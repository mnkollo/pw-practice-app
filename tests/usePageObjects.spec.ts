import { expect, test } from '@playwright/test';
import { NavigationPage } from '../Page/navigationPage';
import { FormLayoutsPage } from '../Page/formLayoutsPage';


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
})

test('naviage to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);

    await navigateTo.formLayoutPage();
    await navigateTo.datepickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
})
test('parameterized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onFormLayoutsPage = new FormLayoutsPage(page);

    await navigateTo.formLayoutPage();
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
    await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckbox('Greg Wilson', 'Pickles@test.com', false);
})