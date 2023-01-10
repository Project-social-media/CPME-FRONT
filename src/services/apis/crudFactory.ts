import { Observable } from 'rxjs';
// import http module
import { HttpClient } from '@angular/common/http';

// Définissez une interface pour les méthodes CRUD communes
interface ICRUDMethods {
	get: (id: string | number) => Observable<any>;
	getAll: () => Observable<any>;
	create: (data: any) => Observable<any>;
	update: (id: string | number, data: any) => Observable<any>;
	delete: (id: string | number) => Observable<any>;
}

// Définissez une classe de base pour les services de ressources
export abstract class CRUDFactory {
	constructor(protected http: HttpClient, protected apiURL: string) {}

	// Créez un objet avec les méthodes CRUD pour les ressources
	crudMethods: ICRUDMethods = {
		get: (id: string | number) => this.http.get(`${this.apiURL}/id/${id}`, { observe: 'response', responseType: 'json' }),
		getAll: () => this.http.get(`${this.apiURL}/`, { observe: 'response', responseType: 'json' }),
		create: (data: any) => this.http.post(`${this.apiURL}/create`, data, { observe: 'response', responseType: 'json' }),
		update: (id: string | number, data: any) => this.http.put(`${this.apiURL}/update/${id}`, data, { observe: 'response', responseType: 'json' }),
		delete: (id: string | number) => this.http.delete(`${this.apiURL}/delete/${id}`, { observe: 'response', responseType: 'json' }),
	};
}
