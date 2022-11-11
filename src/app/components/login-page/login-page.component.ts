import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@src/services/apis/auth.service';

import { PopupComponent } from '../popup/popup.component';
@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	//
	// ---------
	// Variables
	// ---------
	//

	popupColor!: string;
	popupMessage!: string;
	buttonText: string = 'CONNEXION';
	buttonBgColor: string = '#ef1e19';

	//
	// ---------
	// Constructor
	// ---------
	//

	constructor(private authService: AuthService, private router: Router) {}

	//
	// ---------
	// Form
	// ---------
	//

	loginForm = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	//
	// ---------
	// OnInit
	// ---------
	//

	async ngOnInit() {}

	//
	// ---------
	// Event when user click on login button
	// ---------
	//

	/**
	 * If the button text is equal to CONNEXION, then return true, otherwise return false.
	 * @returns The return value is a boolean value.
	 */
	buttonPointerEvents() {
		return this.buttonText === 'CONNEXION' ? true : false;
	}

	onSubmit() {
		if (!this.buttonPointerEvents()) return;

		if (!this.loginForm.valid) {
			this.displayPopup('Formulaire invalide', '#EF1E19');
			return;
		}

		this.buttonText = 'Connexion en cours...';
		this.buttonBgColor = '#d9d9d9';

		// Authentification with 1second delay for the style 😎
		setTimeout(() => {
			this.authService.login(this.loginForm.get('username')!.value!, this.loginForm.get('password')!.value!).subscribe({
				next: (res) => {
					console.log('🚀 ~ file: login-page.component.ts ~ line 79 ~ LoginPageComponent ~ this.authService.login ~ res', res);
					localStorage.setItem('token', res.body.accessToken);
					window.location.href = '/dashboard';
				},
				error: (err) => {
					console.log(err);
					this.buttonBgColor = '#ef1e19';
					this.buttonText = 'CONNEXION';
					this.displayPopup('Nom ou mot de passe incorrect', '#EF1E19');
				},
			});
		}, 1000);
	}

	/**
	 * This function takes a message and a color as arguments, sets the popupColor and popupMessage
	 * properties to the values of the arguments, gets the popup div element, sets the top style property
	 * to 30px, and after a delay of 3 seconds, sets the top style property to -500px.
	 * @param {string} message - string - The message to display in the popup
	 * @param {string} color - string - the color of the popup
	 */
	displayPopup(message: string, color: string) {
		this.popupColor = color;
		this.popupMessage = message;
		// Get specifiq div element
		var popup = document.getElementById('popup')!;

		popup.style.top = '30px';

		// delay 3s for reset popup position
		setTimeout(() => {
			popup.style.top = '-500px';
		}, 4000);
	}
}
