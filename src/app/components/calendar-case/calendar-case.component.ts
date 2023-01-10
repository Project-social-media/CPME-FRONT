import { Component } from '@angular/core';
import { PostsService } from '@src/services/apis/posts.services';

@Component({
	selector: 'app-calendar-case',
	templateUrl: './calendar-case.component.html',
	styleUrls: ['./calendar-case.component.scss'],
})
export class CalendarCaseComponent {
	constructor(private postsService: PostsService) {}

	ngOnInit() {}

	getMonthDays() {
		const days = [];
		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const firstDayIndex = firstDay.getDay();
		const firstDayDate = firstDay.getDate();

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

	getAllPostsByDate(date: Date) {
		this.postsService.getAllPostsByDate(date).subscribe({
			next: (response) => {
				console.log(response);
				return 0;
			},
		});
	}

	getYesterday() {
		const date = new Date();
		date.setDate(date.getDate() - 1);
		return date;
	}

	getToday() {
		return new Date();
	}
}
