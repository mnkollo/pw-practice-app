import { expect,Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

 export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)

    }
    async selectCommonDatePickerDateFromToday (numberOfDaysFromToday: number){
            const calenderInputField = this.page.getByPlaceholder('Form Picker');
            await calenderInputField.click();

            const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
            await expect(calenderInputField).toHaveValue(dateToAssert);

    }
    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
            const calenderInputField = this.page.getByPlaceholder('Range Picker');
            await calenderInputField.click();
            const startDateToAssert = await this.selectDateInTheCalendar(startDayFromToday);
            const endDateToAssert = await this.selectDateInTheCalendar(endDayFromToday);
            const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`;
            await expect(calenderInputField).toHaveValue(dateToAssert);


    }
    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
            let date = new Date()   //Date is a javascript object (constructor) that can perform different operations with date and time
            date.setDate(date.getDate() + numberOfDaysFromToday);
            const expectedDate = date.getDate().toString();
            const expectedMonthShort = date.toLocaleString('En-US',{month: 'short'});
            const expectedMonthLong = date.toLocaleString('En-US',{month: 'long'});
            const expectedYear = date.getFullYear();
            const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        
            let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
            const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
            while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
            }
            await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact: true}).first().click();
            return dateToAssert
    }
}
