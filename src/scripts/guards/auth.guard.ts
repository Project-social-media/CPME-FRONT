import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@src/services/apis/auth.service';
import { last, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	async canActivate() {
		// Get token from local storage
		const token = localStorage.getItem('token');

		if (!token) {
			// Check token validity
			this.router.navigate(['/login']);
			return false;
		}

		const response = await lastValueFrom(this.authService.checkToken(token!));

		if (response.valid) return true;

		this.router.navigate(['/login']);
		return false;
	}
}
