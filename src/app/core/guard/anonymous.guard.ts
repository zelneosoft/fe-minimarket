import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/api/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

	constructor(private authService: AuthenticationService, private router: Router) { }

	canActivate(): boolean {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/']);
			return false;
		} else {
			return true;
		}
	}
}
