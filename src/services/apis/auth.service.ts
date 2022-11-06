import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { apiURL } from 'src/scripts/global';
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
	constructor(private http: HttpClient) {}

	// Login
	login(username: string, password: string): Observable<any> {
		return this.http.post(`${apiURL}/auth/login`, { username, password });
	}

	// Check token validity without headers
	checkToken(token: string): Observable<any> {
		return this.http.post(`${apiURL}/auth/check-token`, { token });
	}
}
