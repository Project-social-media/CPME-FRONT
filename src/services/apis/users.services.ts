import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { CRUDFactory } from './crudFactory';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserService extends CRUDFactory {
	constructor(http: HttpClient) {
		// Appelez le constructeur de la classe parente en passant les paramètres requis
		super(http, 'http://localhost:3000/api/users');
	}

	// Utilisez les méthodes crudMethods héritées pour effectuer des requêtes HTTP vers l'API

	// Méthode pour récupérer tous les utilisateurs
	getUsers(id: string): Observable<any> {
		return this.crudMethods.get(id);
	}

	getAllUsers(): Observable<any> {
		return this.crudMethods.getAll();
	}

	// Méthode pour créer un utilisateur
	createUser(username: string, password: string): Observable<any> {
		return this.crudMethods.create({ username, password });
	}

	// Méthode pour mettre à jour un utilisateur
	updateUser(id: string, username: string, password: string): Observable<any> {
		return this.crudMethods.update(id, { username, password });
	}

	// Méthode pour supprimer un utilisateur
	deleteUser(id: string): Observable<any> {
		return this.crudMethods.delete(id);
	}

	getUserByToken(): Observable<any> {
		return this.http.get(`${this.apiURL}/me`, { observe: 'response', responseType: 'json' });
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
