import { Locator, Page } from "@playwright/test"

export class FormLayoutsPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });
        await usingTheGridForm.locator('#inputEmail1').fill(email);
        await usingTheGridForm.locator('#inputPassword2').fill(password);
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
        await usingTheGridForm.getByRole('button').click();
    }

    /**
     * This method will fill out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email for the tet user
     * @param rememberMe - true or false if user session to be saved
     */
    async submitInLineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({ force: true });
        await inlineForm.getByRole('button').click();
    }
}