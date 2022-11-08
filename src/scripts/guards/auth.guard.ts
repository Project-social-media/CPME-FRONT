import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '@src/services/apis/users.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private usersService: UsersService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');
		if (token) {
		}

		return true;
	}
}
