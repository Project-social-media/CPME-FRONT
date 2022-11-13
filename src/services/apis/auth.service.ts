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
	constructor(private http: HttpClient) {}

	login(username: String, password: String): Observable<any> {
		return this.http.post(`${apiURL}/auth/login`, { username: username, password: password }, { observe: 'response', responseType: 'json' });
	}

	async logout() {
		// Create confirmation to logout
		const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?');
		// If the user click on OK, then logout
		if (confirmation) {
			localStorage.clear();
			window.location.reload();
		}
	}
}
