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
export class PostsService {
	constructor(private http: HttpClient) {}

	// Create new post
	createPost(data: any): Observable<any> {
		return this.http.post(`${apiURL}/posts/create`, data, { observe: 'response', responseType: 'json' });
	}
}
