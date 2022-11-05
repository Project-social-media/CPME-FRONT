import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class UsersService {
	constructor(private http: HttpClient) {}

	// get users request with authorization header
	getUsers(): Observable<any> {
		return this.http.get(`${apiURL}/users`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	}

	getUserByName(name: string): Observable<any> {
		return this.http.get(`${apiURL}/users/username/${name}`);
	}
}
