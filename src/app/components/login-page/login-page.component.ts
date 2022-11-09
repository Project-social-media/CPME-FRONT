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

		var username: string = this.loginForm.get('username')!.value!;
		var password: string = this.loginForm.get('password')!.value!;

		this.authService.login(username, password).subscribe({
			next: (res) => {
				console.log('🚀 ~ file: login-page.component.ts ~ line 53 ~ LoginPageComponent ~ this.authService.login ~ res', res);
				localStorage.setItem('token', res.body.accessToken);
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}

//
// ---------
// Authenticated user after login
// ---------
//
