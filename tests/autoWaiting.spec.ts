import { expect, test } from '@playwright/test';

test.beforeEach('first test', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
})
test('auto waiting', async ({ page }) => {
    const successMessage = page.locator('.bg-success')
    await successMessage.click();

    //const text = await successMessage.textContent()
    // await successMessage.waitFor({ state: 'attached' })
    // const text = await successMessage.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})

test('alternative waits', async ({page}) => {
    const successMessage = page.locator('.bg-success')

    //___ wait for element
    //await page.waitForSelector('.bg-success')

    //---wait for particular response 
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    // const text = await successMessage.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')


    //___wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')
    const text = await successMessage.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')


    //await page.waitForTimeout(5000)
    //await page.waitForURL('http://uitestingplayground.com/ajax')
})

test('timeouts', async ({page}) => {
    //test.setTimeout(10000)
    
    const successMessage = page.locator('.bg-success')
    await successMessage.click({timeout: 20000})
})


