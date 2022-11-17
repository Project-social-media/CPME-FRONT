import { Component } from '@angular/core';

@Component({
	selector: 'app-calendar-case',
	templateUrl: './calendar-case.component.html',
	styleUrls: ['./calendar-case.component.scss'],
})
export class CalendarCaseComponent {
	constructor() {}

	ngOnInit() {}

	getMonthDays() {
		const days = [];
		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		const firstDayIndex = firstDay.getDay();
		const lastDayIndex = lastDay.getDay();
		const firstDayDate = firstDay.getDate();
		const lastDayDate = lastDay.getDate();

		if (firstDayIndex === 1) {
			for (let i = 0; i < 30; i++) {
				days.push(new Date(date.getFullYear(), date.getMonth(), firstDayDate + i));
			}
		} else {
			for (let i = 0; i < 35; i++) {
				days.push(new Date(date.getFullYear(), date.getMonth(), firstDayDate - firstDayIndex + 1 + i));
			}
		}

		return days;
	}

	getYesterday() {
		const date = new Date();
		date.setDate(date.getDate() - 1);
		return date;
	}
}
