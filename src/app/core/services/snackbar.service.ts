import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	constructor(private snackBar: MatSnackBar) { }

	showSuccessSnackbar(message: string) {
		this.snackBar.open(message, '', {
			panelClass: ['success-snackbar']
		});
	}

	showErrorSnackbar(message: string) {
		this.snackBar.open(message, '', {
			panelClass: ['error-snackbar']
		});
	}
}
