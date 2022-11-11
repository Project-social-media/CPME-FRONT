import { Component, OnInit } from '@angular/core';
import { UsersService } from '@src/services/apis/users.service';

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
}
