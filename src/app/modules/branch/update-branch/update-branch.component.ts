import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../core/services/api/branch.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
	selector: 'app-update-branch',
	templateUrl: './update-branch.component.html',
	styleUrls: ['./update-branch.component.scss']
})
export class UpdateBranchComponent implements OnInit {

	public form = {
		id: 0,
		name: '',
		address: '',
		maps: '',
		email: '',
		phone: '',
		pic: '',
		is_active: 0,
	};

	public formValid = {
		name: true,
		address: true,
	};

	ready = false;
	constructor(
		private branchService: BranchService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private snackbarService: SnackbarService
	) {
		this.activeRoute.queryParams.subscribe(params => {
			this.form.id = params['id']
			if (!this.form.id) {
				this.close()
			} else {
				this.loadDetail();
			}
		});
	}

	ngOnInit(): void {
	}

	loadDetail() {
		this.branchService.getBranchById(this.form.id).subscribe({
			next: (r) => {
				Object.assign(this.form, r.data[0]);
			},
			error: (e) => {
				console.log(e);
			}
		});
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
		this.branchService.updateBranch(body).subscribe({
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
