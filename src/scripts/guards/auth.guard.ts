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

		if (!token) return false;
		if (!this.usersService.getUserByTokenCheck()) return this.router.createUrlTree(['/login']);
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
		if (this.usersService.getUserByTokenCheck()) return this.router.createUrlTree(['/dashboard']);
		return true;
	}
}
