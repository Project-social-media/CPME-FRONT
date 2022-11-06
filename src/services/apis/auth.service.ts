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

	login(data: any): Observable<any> {
		return this.http.post(`${apiURL}/auth/login`, data);
	}

	checkToken(): Observable<any> {
		return this.http.get(`${apiURL}/auth/checkToken`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	}
}
