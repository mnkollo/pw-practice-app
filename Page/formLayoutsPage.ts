import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

 export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    /**
     * 
     * @param email - put in the email duh
     * @param password 
     * @param optionText 
     */
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
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true });
            await inlineForm.getByRole('button').click();
        }
    }

    async submitBasicFormEmailAndPassword(email: string, password: string, checkMeOut: boolean){
        const basicForm = this.page.locator('nb-card',{hasText: 'Basic form'})

        await basicForm.getByRole('textbox', {name:'Email'}).fill(email)
        await basicForm.getByRole('textbox', {name:'Password'}).fill(password)
        if (checkMeOut){
            await basicForm.getByRole('checkbox').check({ force: true})
            await basicForm.getByRole('button').click()
        }
    }
    

}
