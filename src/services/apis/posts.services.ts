import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { apiURL } from 'src/scripts/global';
import { CRUDFactory } from './crudFactory';
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
export class PostsService extends CRUDFactory {
	constructor(http: HttpClient) {
		// Appelez le constructeur de la classe parente en passant les paramètres requis
		super(http, 'http://localhost:3000/api/posts');
	}

	// Utilisez les méthodes crudMethods héritées pour effectuer des requêtes HTTP vers l'API

	// Méthode pour récupérer tous les messages
	getPost(id: string): Observable<any> {
		return this.crudMethods.get(id);
	}

	getAllPosts(): Observable<any> {
		return this.crudMethods.getAll();
	}

	// Méthode pour créer un message
	createPost(data: {}): Observable<any> {
		return this.crudMethods.create(data);
	}

	// Méthode pour mettre à jour un message
	updatePost(id: string, data: {}): Observable<any> {
		return this.crudMethods.update(id, data);
	}

	// Méthode pour supprimer un message
	deletePost(id: string): Observable<any> {
		return this.crudMethods.delete(id);
	}

	getPostByToken(): Observable<any> {
		return this.http.get(`${this.apiURL}/me`, { observe: 'response', responseType: 'json' });
	}
}
