import { expect,Page } from "@playwright/test"
import { NavigationPage } from '../Page/navigationPage';
import { FormLayoutsPage } from '../Page/formLayoutsPage';
import { DatePickerPage } from '../Page/datePickerPage'
import { HelperBase } from "./helperBase";

export class PageManager extends HelperBase {

    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datePickerPage: DatePickerPage;

    constructor(page: Page){
      super(page)
      this.navigationPage = new NavigationPage(this.page)
      this.formLayoutsPage = new FormLayoutsPage(this.page)
      this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo(){
      return this.navigationPage
    }
    onFormLayoutsPage(){
      return this.formLayoutsPage
    }
    onDatePickerPage(){
      return this.datePickerPage
    }
}