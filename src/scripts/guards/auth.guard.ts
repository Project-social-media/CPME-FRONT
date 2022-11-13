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

		if (!token) return this.router.navigate(['/login']);

		this.usersService.getUserByTokenCheck().then((res) => {
			if (!res) return this.router.navigate(['/login']);
			return true;
		});

		return true;
	}
}

@Injectable({
	providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
	constructor(private usersService: UsersService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');

		if (!token) return true;

		this.usersService.getUserByTokenCheck().then((res) => {
			if (res) return this.router.navigate(['/dashboard']);
			return true;
		});

		return true;
	}
}
