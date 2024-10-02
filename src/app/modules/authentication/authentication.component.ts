import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../core/models/authentication.model';
import { AuthenticationService } from '../../core/services/api/authentication.service';
import { LocalStorageService } from '../../core/services/ls.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

	showPassword: boolean = false;
	public form = {
		email: '',
		password: ''
	};

	public formValid = {
		email: true,
		password: true
	};

	ready = false;
	hide = true;

	loadingBtn = false;

	constructor(private router: Router,
		private authService: AuthenticationService,
		private ls: LocalStorageService,
		private snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
	}

	validator() {
		this.formValid.email = this.form.email ? true : false;
		this.formValid.password = this.form.password ? true : false;

		if (this.formValid.email && this.formValid.password) {
			this.ready = true;
		} else {
			this.ready = false;
		}
	}

	submit() {
		this.validator();
		if (this.ready) {
			this.login();
		}
	}

	goTo(url: string) {
		this.router.navigate([url]);
	}

	login() {
		this.loadingBtn = true;
		const body = this.getRequestBody();
		this.authService.login(body).subscribe(
			(r: LoginResponse) => {
				this.ls.saveToken(r.data.token);
				this.router.navigate(['/']);
				this.loadingBtn = false;
			},
			(e) => {
				this.loadingBtn = false;
				console.error('Login failed', e.error.message);
				this.snackbarService.showErrorSnackbar(e.error.message || 'something is wrong');
			}
		);
	}

	getRequestBody(): LoginRequest {
		return this.form;
	}

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

}
