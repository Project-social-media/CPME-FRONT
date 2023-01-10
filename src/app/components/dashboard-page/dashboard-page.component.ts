import { Component, OnInit } from '@angular/core';
import { UserService } from '@src/services/apis/users.services';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
	constructor() {}

	async ngOnInit() {
		console.log('DashboardPageComponent');
	}

	// random 1 to 9999
	randomNumber() {
		return Math.floor(Math.random() * 9999) + 1;
	}
}
