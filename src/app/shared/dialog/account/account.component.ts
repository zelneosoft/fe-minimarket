import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/ls.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	constructor(
		private ls: LocalStorageService,
		private router: Router,
		public dialogRef: MatDialogRef<AccountComponent>
	) { }

	ngOnInit(): void {
	}

	logout() {
		this.ls.clear()
		this.router.navigate(['/authentication']);
		this.dialogRef.close();
	}

}
