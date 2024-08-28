import { test } from '@playwright/test';
import { PageManager } from '../Page/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {

    await page.goto('/');
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
    let randomFullName = faker.person.fullName({ firstName: 'Michael'});
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)} @test.com`;

    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'});
    //const buffer = await page.screenshot();
    //console.log(buffer.toString('base64'));
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({path: 'screenshots/inlineForm.png'});
})
test('parameterized methods test', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutsPage().submitBasicFormEmailAndPassword('test@test.com', 'Welcome1', true);
})
test.skip('Common Datepicker', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(4,3)
})