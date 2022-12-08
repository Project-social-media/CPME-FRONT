import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiURL } from 'src/scripts/global';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(username: String, password: String): Observable<any> {
		return this.http.post(`${apiURL}/auth/login`, { username, password }, { observe: 'response', responseType: 'json' });
	}

	logout() {
		const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?');
		if (confirmation) {
			localStorage.clear();
			window.location.reload();
		}
	}
}
