import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UsersService } from '@src/services/apis/users.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private usersService: UsersService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');

		if (token) {
			const response = await lastValueFrom(this.usersService.getUserByToken());

			if (window.location.pathname === '/login' && response.valid) {
				console.log('redirect to dashboard');
				this.router.navigate(['/dashboard']);
				return false;
			}

			if (window.location.pathname === '/dashboard' && !response.valid) {
				console.log('redirect to login');
				this.router.navigate(['/login']);
				return false;
			}
		} else {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
}
