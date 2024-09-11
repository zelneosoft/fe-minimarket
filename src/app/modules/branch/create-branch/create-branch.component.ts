import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../../core/services/api/branch.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
	selector: 'app-create-branch',
	templateUrl: './create-branch.component.html',
	styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {

	public form = {
		id: 0,
		name: '',
		address: '',
		maps: '',
		email: '',
		phone: '',
		pic: '',
		is_active: 1,
	};

	public formValid = {
		name: true,
		address: true,
	};

	ready = false;
	selectedBranches: number[] = [];
	constructor(
		private branchService: BranchService,
		private router: Router,
		private snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
	}

	submit() {
		this.validator();
		if (this.ready) {
			this.handleSubmit();
		}
	}

	validator() {
		this.formValid.address = this.form.address ? true : false;
		this.formValid.name = this.form.name ? true : false;

		if (this.formValid.address && this.formValid.name) {
			this.ready = true;
		} else {
			this.ready = false;
		}
	}

	handleSubmit() {
		const body = this.form;
		this.branchService.insertBranch(body).subscribe({
			next: (r) => {
				this.snackbarService.showSuccessSnackbar("Success insert : " + body.name);
				this.close();
			},
			error: (e) => {
				console.error('Failed', e.error.message);
				this.snackbarService.showErrorSnackbar(e.error.message);
			}
		});
	}

	close() {
		this.router.navigate(['branch/']);
	}

	toggleActive(event: any) {
		this.form.is_active = event.target.checked ? 1 : 0;
	}
}
