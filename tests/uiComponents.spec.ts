import { TestabilityRegistry } from '@angular/core';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
})
test.describe('Forms - UI Components', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })
    test('input field', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 100 })

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

    })
    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })

        //generic assertion
        const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()  //return boolean
        expect(radioStatus).toBeTruthy()

        //locator assertion
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()
        //await expect(usingTheGridForm.getByRole('radio',{name: 'Option 2'})).toBeChecked()
        // const option2RadioButton = page.locator('label',{hasText: 'Option 2'}).locator('span.inner-circle')
        // await option2RadioButton.check()
    })
})
test.describe('Modal& OVerlays - Ui Components', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })
    test('check boxes', async ({ page }) => {

        await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
        await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

        expect(await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked()).toBeFalsy()
        expect(await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).isChecked()).toBeTruthy()

        const allBoxes = page.getByRole('checkbox')

        for (const box of await allBoxes.all()) {
            await box.uncheck({ force: true })
            expect(await box.isChecked()).toBeFalsy()
        }

    })
    test('list and dropdowns', async ({ page }) => {
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') // when the list has a UL tag
        page.getByRole('listitem') // when the list has LI tag

        //const optionList = page.getByRole('list').locator('nb-option')
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({ hasText: 'Dark' }).click()


        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')

        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
        }

        await dropdownMenu.click()
        for (const color in colors) {
            await optionList.filter({ hasText: color }).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if (color != 'Corporate')
                await dropdownMenu.click()
        }
    })
    test('tooltips', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements'})
        await toolTipCard.getByRole('button', { name: 'Top' }).hover()

        page.getByRole('tooltip') // if you have a role tooltip created
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })
    test('dialog box', async ({ page }) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr',{hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })
    test('web tables', async ({ page }) => {
            await page.getByText('Tables & Data').click()
            await page.getByText('Smart Table').click()

            //1 get teh row by any text in this row
            const targetRow = page.getByRole('row',{name: 'twitter@outlook.com'})
            await targetRow.locator('.nb-edit').click()
            await page.locator('input-editor').getByPlaceholder('Age').clear()
            await page.locator('input-editor').getByPlaceholder('Age').fill('99')
            await page.locator('.nb-checkmark').click()
            await expect(targetRow).toContainText('99')

            //2 get the row based on the value in the specific column
            await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
            const targetRowById = page.getByRole('row',{name: '11'}).filter({has: page.locator('td').nth(1)}).getByText('11')
            await page.getByRole('row',{name: '11'}).first().locator('.nb-edit').click()
            await page.locator('input-editor').getByPlaceholder('E-mail').clear()
            await page.locator('input-editor').getByPlaceholder('E-mail').fill('hello@test.com')
            await page.locator('.nb-checkmark').click()
            await expect(page.getByRole('row',{name: '11'}).first()).toContainText('hello@test.com')

            //3 test filter of the table
            const ages = ['20', '30', '40', '200']

            
        })
    test('sliders', async({page}) => {

        await page.getByText('IoT Dashboard').click()
        // Update attribute 
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await tempGauge.evaluate( node => {
            node.setAttribute('cx', '269.387172617963')
            node.setAttribute('cy', '119.50708507972962')
        })
        await tempGauge.click()

        // mouse move
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()

        //bounding Box
        await tempBox.boundingBox()
        const box = await  tempBox.boundingBox()
        const x = box.x + box.y / 2
        const y = box.y + box.height / 2
        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 100, y + 100)
        await page.mouse.up()

        await expect(tempBox).toContainText('29')

    })
})