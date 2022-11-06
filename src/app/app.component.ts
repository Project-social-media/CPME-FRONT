import { Component } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { AuthService } from '@src/services/apis/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	checkToken: boolean = false;

	//
	// ---------
	// Constructor
	// ---------
	//
	constructor(private authService: AuthService) {}

	async ngOnInit() {
		// check if current route is login
		if (window.location.pathname === '/login' && localStorage.getItem('token')) {
			const response = await lastValueFrom(this.authService.checkToken(localStorage.getItem('token')!));
			if (response.valid) window.location.href = '/dashboard';
		} else {
			this.checkToken = true;
		}
	}
}
