import { expect, test } from '@playwright/test';


test.describe('Form Layout Page', async () => {
    test.beforeEach('Navigate To Forms', async ({ page }) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
    test('Verify Block Form ', async ({ page }) => {
        const firstNameInputField = page.locator('nb-card', { hasText: 'Block form' }).locator('[id="inputFirstName"]')
        const lastNameInputField = page.locator('nb-card', { hasText: 'Block form' }).locator('[id="inputLastName"]')
        const emailInputField = page.locator('nb-card', { hasText: 'Block form' }).locator('[type="email"]')
        const submit = page.locator('nb-card', { hasText: 'Block form' }).locator('[type="submit"]')


        await firstNameInputField.fill('Michael')
        await lastNameInputField.fill('Test')
        await emailInputField.fill('Michael@mailinator.com')
        await submit.click()

        //generic assertion
        const inputValue = await firstNameInputField.inputValue()

        //locator assertion
        expect(inputValue).toEqual('Michael')
    })
    test.describe('Checkboxes', async () => {
        test.beforeEach('Navigate To Forms', async ({ page }) => {
            await page.goto('http://localhost:4200/')
            await page.getByText('Modal & Overlays').click()
            await page.getByText('Toastr').click()
        })
        test('Verify 1st and 3rd Checkboxes checked', async ({ page }) => {
            const firstRadioButton =  page.locator('label', { hasText: 'Hide on click' }).locator('.custom-checkbox')
            const secondRadioButton =  page.locator('label', { hasText: 'Prevent arising of duplicate toast' }).locator('.custom-checkbox')

            await firstRadioButton.uncheck()
            await secondRadioButton.check()
        })
    })
})