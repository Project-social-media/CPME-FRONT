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

	// get all users with header token
	getAllUsers(): Observable<any> {
		return this.http.get(`${apiURL}/users`, {
			observe: 'response',
		});
	}
}
