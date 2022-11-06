import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@src/services/apis/auth.service';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');

		const response = await lastValueFrom(this.authService.checkToken(token!));
		console.log('🚀 ~ file: auth.guard.ts ~ line 16 ~ AuthGuard ~ canActivate ~ response', response.valid);

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

		return true;
	}
}
