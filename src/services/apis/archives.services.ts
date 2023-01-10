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
export class ArchivesService extends CRUDFactory {
	constructor(http: HttpClient) {
		// Appelez le constructeur de la classe parente en passant les paramètres requis
		super(http, 'http://localhost:3000/api/archives');
	}

	// Utilisez les méthodes crudMethods héritées pour effectuer des requêtes HTTP vers l'API

	// Méthode pour récupérer tous les messages
	getArchive(id: string): Observable<any> {
		return this.crudMethods.get(id);
	}

	getAllArchives(): Observable<any> {
		return this.crudMethods.getAll();
	}

	getAllArchivesByDate(date: Date): Observable<any> {
		return this.http.post(`${this.apiURL}/date`, { date }, { observe: 'response', responseType: 'json' });
	}

	// Méthode pour créer un message
	createArchive(data: {}): Observable<any> {
		return this.crudMethods.create(data);
	}

	// Méthode pour mettre à jour un message
	updateArchive(id: string, data: {}): Observable<any> {
		return this.crudMethods.update(id, data);
	}

	// Méthode pour supprimer un message
	deleteArchive(id: string): Observable<any> {
		return this.crudMethods.delete(id);
	}

	getArchiveByToken(): Observable<any> {
		return this.http.get(`${this.apiURL}/me`, { observe: 'response', responseType: 'json' });
	}
}
