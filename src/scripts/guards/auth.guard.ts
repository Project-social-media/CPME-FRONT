import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@src/services/apis/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate() {
		if (this.authService.checkToken()) {
			this.router.navigate(['/login']);
			return false;
		}
		return true;
	}
}
