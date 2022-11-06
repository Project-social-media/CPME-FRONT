import { Component } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { AuthService } from '@src/services/apis/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	//
	// ---------
	// Constructor
	// ---------
	//
	constructor(private authService: AuthService) {}

	async ngOnInit() {}
}
