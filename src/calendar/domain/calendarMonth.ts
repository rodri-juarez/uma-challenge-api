import {CalendarDay} from "./calendarDay";

export class CalendarMonth {
  days: CalendarDay[]
  constructor(days: CalendarDay[]) {
    this.days = days;
  }
}
