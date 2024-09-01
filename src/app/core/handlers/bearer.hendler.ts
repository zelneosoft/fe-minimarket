import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/ls.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class BearerHandler extends HttpHandler {
	constructor(
		private readonly next: HttpHandler,
		private router: Router,
		public dialog: MatDialog,
		private ls: LocalStorageService,
		private snackbar: SnackbarService
	) {
		super();
	}

	handle(req: HttpRequest<any>) {
		const clone = req.clone({
			setHeaders: {
				Authorization: 'Bearer ' + this.ls.getToken(),
				platform: 'web'
			}
		});
		return this.next.handle(clone).pipe(
			catchError((response: HttpErrorResponse) => {
				if (response.status === 401) {
					console.log("Harus login dulu")
					this.snackbar.showErrorSnackbar('Login expired')
					this.ls.clear();
					this.router.navigate(['/authentication']);
				}
				return throwError(response);
			})
		);
	}
}
