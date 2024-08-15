import {expect, test} from '@playwright/test';

test.beforeEach('first test', async({page})  => {
   await page.goto('http://localhost:4200/');
   await page.getByText('Forms').click();
   await page.getByText('Form Layouts').click();
})

test.describe('Page Layout', () => {
    
    test('User facing locators', async({page}) => {
        await page.getByRole('textbox', {name: 'Email'}).first().click();

        await page.getByRole('button', {name: 'Submit'}).first().click();

        await page.getByRole('button', {name: 'Sign In'}).first().click();

        await page.getByLabel('Email').first().click();

        await page.getByPlaceholder('Jane Doe').click();

        await page.getByText('Using the Grid').click();

        await page.getByTitle('IoT Dashboard').click();

        //await page.getByTestId('SignIn').click();
    })

    test.only('extracting vales', async({page}) => {
        //single text value
        const basicForm = page.locator('nb-card', {hasText: 'Basic form'});
        const buttonText = await basicForm.locator('button').textContent();
        expect(buttonText).toEqual('Submit');

        //how to get all text values
        const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
        expect(allRadioButtonsLabels).toContain('Option 1')

        //input field
        const emailField = basicForm.getByRole('textbox', {name: 'Email'});
        await emailField.fill('test@test.com')
        const emailFieldValue = await emailField.inputValue();
        expect(emailFieldValue).toEqual('test@test.com');

        //select field
        const placeholderValue = await emailField.getAttribute('placeholder');
        expect(placeholderValue).toEqual('Email');
    })

    test('assertions', async({page}) => {
        //general asssertions
        const submitButton = page.locator('nb-card',{hasText:'Basic form'}).locator('button')
          
        const text = await submitButton.textContent();   
        expect(text).toEqual('Submit');          //compare values on left to value on right


        //Locator assertion
        await expect(submitButton).toHaveText('Submit'); 

        //soft Assertion
        await expect.soft(submitButton).toHaveText('Submit5');     // soft assertion is not considered good practice
        await submitButton.click(); 
    })
})

