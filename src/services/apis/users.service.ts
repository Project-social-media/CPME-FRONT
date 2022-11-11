import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

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
		return this.http.get(`${apiURL}/users`, { observe: 'response', responseType: 'json' });
	}

	// Get user by id
	getUserById(id: string): Observable<any> {
		return this.http.get(`${apiURL}/users/${id}`, { observe: 'response', responseType: 'json' });
	}

	// Get user by token
	getUserByToken(): Observable<any> {
		return this.http.get(`${apiURL}/users/getByIdInJwtToken`, { observe: 'response', responseType: 'json' });
	}

	// Create new user
	createUser(data: any): Observable<any> {
		return this.http.post(`${apiURL}/users`, data, { observe: 'response', responseType: 'json' });
	}

	// Update user
	updateUser(id: string, data: any): Observable<any> {
		return this.http.put(`${apiURL}/users/${id}`, data, { observe: 'response', responseType: 'json' });
	}

	// Delete user
	deleteUser(id: string): Observable<any> {
		return this.http.delete(`${apiURL}/users/${id}`, { observe: 'response', responseType: 'json' });
	}

	async getUserByTokenCheck(): Promise<boolean> {
		try {
			const res = await lastValueFrom(this.getUserByToken());
			if (res.status === 200) return true;
			return false;
		} catch (error) {
			return false;
		}
	}
}
