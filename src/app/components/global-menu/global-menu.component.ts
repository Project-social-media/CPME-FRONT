import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/services/apis/auth.services';
@Component({
	selector: 'app-global-menu',
	templateUrl: './global-menu.component.html',
	styleUrls: ['./global-menu.component.scss'],
})
export class GlobalMenuComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	logout() {
		this.authService.logout();
	}
}
