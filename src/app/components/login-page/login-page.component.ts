import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@src/services/apis/auth.service';

import { PopupComponent } from '../popup/popup.component';
@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	popupColor!: string;
	popupMessage!: string;
	buttonText: string = 'CONNEXION';
	buttonBgColor: string = '#ef1e19';

	buttonPointerEvents() {
		return this.buttonText === 'CONNEXION' ? true : false;
	}

	//
	// ---------
	// Constructor
	// ---------
	//

	constructor(private authService: AuthService) {}

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

	onSubmit() {
		if (!this.buttonPointerEvents()) return;

		if (!this.loginForm.valid) {
			this.displayPopup('Formulaire invalide', '#EF1E19');
			return;
		}

		this.buttonText = 'Connexion en cours...';
		this.buttonBgColor = '#d9d9d9';

		setTimeout(() => {
			this.authService.login(this.loginForm.get('username')!.value!, this.loginForm.get('password')!.value!).subscribe({
				next: (res) => {
					console.log('🚀 ~ file: login-page.component.ts ~ line 53 ~ LoginPageComponent ~ this.authService.login ~ res', res);
					localStorage.setItem('token', res.body.accessToken);
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

	displayPopup(message: string, color: string) {
		this.popupColor = color;
		this.popupMessage = message;
		// Get specifiq div element
		var popup = document.getElementById('popup')!;

		popup.style.top = '30px';

		// delay 3s
		setTimeout(() => {
			popup.style.top = '-500px';
		}, 5000);
	}
}

//
// ---------
// Authenticated user after login
// ---------
//
