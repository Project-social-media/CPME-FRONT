import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@src/services/apis/auth.service';
import { last, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	async canActivate() {
		// const response = await lastValueFrom(this.authService.checkToken(token!));
		return false;
	}
}
