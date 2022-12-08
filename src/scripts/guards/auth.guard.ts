import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '@src/services/apis/users.services';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private usersService: UserService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');

		// Si il n'y a pas de token, on redirige vers la page de login
		if (!token) return this.router.navigate(['/login']);

		// Si la vérification du token échoue, on redirige vers la page de login
		try {
			const user = await this.usersService.getUserByTokenCheck();
			if (!user) return this.router.navigate(['/login']);
		} catch (error) {
			return this.router.navigate(['/login']);
		}

		// Si toutes les vérifications ont été passées, on autorise l'accès
		return true;
	}
}

@Injectable({
	providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
	constructor(private usersService: UserService, private router: Router) {}

	async canActivate() {
		const token = localStorage.getItem('token');

		// Si il n'y a pas de token, on autorise l'accès à la page de login
		if (!token) return true;

		// Si la vérification du token réussit, on redirige vers le dashboard
		try {
			const user = await this.usersService.getUserByTokenCheck();
			if (user) return this.router.navigate(['/dashboard']);
		} catch (error) {
			return this.router.navigate(['/login']);
		}

		// Si toutes les vérifications ont été passées, on autorise l'accès
		return true;
	}
}
