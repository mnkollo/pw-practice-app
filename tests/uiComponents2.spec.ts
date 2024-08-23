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
})
test.describe('Checkboxes', async () => {
    test.beforeEach('Navigate To Toastr', async ({ page }) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })
    test('Verify 1st and 2nd Checkboxes checked then check all', async ({ page }) => {
        const firstRadioButton = page.locator('label', { hasText: 'Hide on click' }).locator('.custom-checkbox')
        const secondRadioButton = page.locator('label', { hasText: 'Prevent arising of duplicate toast' }).locator('.custom-checkbox')

        await firstRadioButton.uncheck()
        await secondRadioButton.check()

        const allCheckboxes = page.locator('.custom-checkbox')

        for (const box of await allCheckboxes.all()) {
            await box.check({ force: true })
            expect(await box.isChecked()).toBeTruthy()
        }
    })
})
test.describe('list and dropdowns', async () => {
    test.beforeEach('Open Site', async ({ page }) => {
        await page.goto('http://localhost:4200/')
    })
    test('Validate color changes on webpage when switching dropdown', async ({ page }) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        // page.getByRole('list')  // when the list has a UL tag
        // page.getByRole('listitem')  //when the list has LI tag

        //validating the array
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
        await optionList.filter({ hasText: 'Cosmic' }).click()

        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
        }

        await dropDownMenu.click()
        for (const color in colors) { // we use in because we are iterating over the keys of the object
            await optionList.filter({ hasText: color }).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if (color != 'Corporate') {
                await dropDownMenu.click()
            }
        }
    })
})
test.describe('Tool Tip', async () => {
    test.beforeEach('Navigate To Tool Tips Page', async ({ page }) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })
    test('Validate tool tip', async ({ page }) => {
        const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
        await tooltipCard.getByRole('button', { name: 'TOP' }).hover()
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })
})
test.describe('Dialog Box', async () => {
    test.beforeEach('Navigate To Tables Page', async ({ page }) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Tables & Data').click()
        await page.locator('a', { hasText: 'Smart Table' }).click()
    })
    test('Validate dialog Box', async ({ page }) => {

        page.on('dialog', dialog => {   // we have to use event listener
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })
        const trashCanFirstRow = page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash')
        await trashCanFirstRow.click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })
    test.describe('Web Tables', async () => {
        test.beforeEach('Navigate To Tables Page', async ({ page }) => {
            await page.goto('http://localhost:4200/')
            await page.getByText('Tables & Data').click()
            await page.locator('a', { hasText: 'Smart Table' }).click()
        })
        test('Validate webTable', async ({ page }) => {

            // get row by any text in the row
            const targetRow = page.getByRole('row', { name: 'snow@gmail.com' })
            await targetRow.locator('.nb-edit').click()
            await page.locator('input-editor').getByPlaceholder('Age').clear()
            await page.locator('input-editor').getByPlaceholder('Age').fill('50')
            await page.locator('.nb-checkmark').click()

            //select row by ID column
            // await page.locator('.ng2-smart-pagination').getByText('2').click()
            // const targetRowById = page.getByRole('row').getByText('11').filter({has: page.locator('td').nth(1).getByText('11')})
            // await targetRowById.locator('.nb-edit').click()

            // await page.locator('input-editor').getByPlaceholder('E-mail').clear()
            // await page.locator('input-editor').getByPlaceholder('E-mail').fill('greg@mailinator.com')

            await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
            const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1) }).getByText('11')
            await page.getByRole('row', { name: '11' }).first().locator('.nb-edit').click()
            await page.locator('input-editor').getByPlaceholder('E-mail').clear()
            await page.locator('input-editor').getByPlaceholder('E-mail').fill('hello@test.com')
            await page.locator('.nb-checkmark').click()
            await expect(page.getByRole('row', { name: '11' }).first()).toContainText('hello@test.com')

            //3 test filter of the table

            const ages = ['20', '30', '40', '200']

            for (let age of ages) {   //loop through each value
                await page.locator('input-filter').getByPlaceholder('Age').clear()
                await page.locator('input-filter').getByPlaceholder('Age').fill(age)
                await page.waitForTimeout(1000)
                const ageRows = page.locator('tbody tr')

                for (let row of await ageRows.all()) {
                    const cellValue = await row.locator('td').last().textContent()
                    if(age === '200'){
                        expect( await page.locator('table tr').last().textContent()).toContain('No data found')
                    }else {
                        expect(cellValue).toEqual(age)
                    }
                }
            }
        })
    })
    test.describe('date picker', async () => {

        test.beforeEach('Verify Date picker works as expected', async ({page}) => {
                await page.getByText('Forms').click()
                await page.getByText('Datepicker').click()
        })
        test('Verify Date picker works as expected', async ({page}) => {
            const calenderInputField = page.getByPlaceholder('Form Picker')
            await calenderInputField.click()
            await page.locator('[class="day-cell ng-star-inserted"]').getByText('19',{exact: true}).click()
            expect(calenderInputField).toHaveValue('Aug 19, 2024')

            const header = await page.locator('nb-card-header',{hasText: 'Common Datepicker'}).textContent()
            expect (header).toEqual('Common Datepicker')

        })
        test('date with constructor', async({page}) => {

            let date = new Date()   //Date is a javascript object (constructor) that can perform different operations with date and time
            date.setDate(date.getDate() + 225);
            const expectedDate = date.getDate().toString();
            const expectedMonthShort = date.toLocaleString('En-US',{month: 'short'});
            const expectedMonthLong = date.toLocaleString('En-US',{month: 'long'});
            const expectedYear = date.getFullYear();
            const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        
            const calenderInputField = page.getByPlaceholder('Form Picker');
            await calenderInputField.click();

            let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
            const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
            

            while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
                await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
            }
            await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click();
            await expect(calenderInputField).toHaveValue(dateToAssert);

            const header = await page.locator('nb-card-header',{hasText: 'Common Datepicker'}).textContent();
            expect (header).toEqual('Common Datepicker');
        })
       
    })
    test.describe('', () => {

    })
})
