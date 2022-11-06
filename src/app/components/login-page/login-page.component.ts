import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@src/services/apis/auth.service';
import { UsersService } from '@src/services/apis/users.service';
import { last, lastValueFrom } from 'rxjs';

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

		this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
			next: async (response) => {
				// Save token to local storage
				localStorage.setItem('token', response.accessToken);
				window.location.href = '/dashboard';
			},
			error: (error) => {
				console.log(error);
			},
		});
	}

	//
	// ---------
	// Authenticated user after login
	// ---------
	//
}
