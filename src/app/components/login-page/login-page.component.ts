import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@src/services/apis/auth.service';
import { UsersService } from '@src/services/apis/users.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	//
	// ---------
	// Constructor
	// ---------
	//

	constructor(private authService: AuthService, private usersService: UsersService) {}

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
		if (!this.loginForm.valid) return;
	}

	//
	// ---------
	// Authenticated user after login
	// ---------
	//

	userAuth() {
		this.authService.login(this.loginForm.value).subscribe({
			next: (res) => {
				// save token in local storage
				localStorage.setItem('token', res.accessToken);
				window.location.href = '/dashboard';
			},

			error: (err) => {
				alert('Utilisateur ou mot de passe incorrect.');
			},

			complete: () => {},
		});
	}
}
