import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { apiURL } from 'src/scripts/global';
import { User } from 'src/models/user.model';

//
// ----------------------------------------------------
// Injectable
// ----------------------------------------------------
//

@Injectable({
	providedIn: 'root',
})

//
// ----------------------------------------------------
// Class
// ----------------------------------------------------
//
export class AuthService {
	connectedUser!: BehaviorSubject<User | null>;

	// constructor(private http: HttpClient) {
	// 	this.initBehaviorToken();
	// }

	// initBehaviorToken(): void {
	// 	this.token.next(this.getStoredToken());
	// }

	getStoredToken(): string | null {
		return localStorage.getItem('token');
	}

	storeToken(token: string) {
		localStorage.setItem('token', token);
	}
	// // Login
	// login(username: string, password: string): Observable<User> {
	// 	return this.http.post<User>(`${apiURL}/login`, { username, password });
	// }

	// // Check token validity without headers
	// checkToken(token: string): Observable<any> {
	// 	return this.http.post(`${apiURL}/auth/check-token`, { token });
	// }
}
