import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-global-menu',
	templateUrl: './global-menu.component.html',
	styleUrls: ['./global-menu.component.scss'],
})
export class GlobalMenuComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

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
