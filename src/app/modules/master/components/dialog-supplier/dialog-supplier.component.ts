import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../../../../core/services/api/supplier.service';

@Component({
	selector: 'app-dialog-supplier',
	templateUrl: './dialog-supplier.component.html',
	styleUrls: ['./dialog-supplier.component.scss']
})
export class DialogSupplierComponent implements OnInit {

	id: number = 0;
	public form = {
		name: '',
		address: '',
		maps: '',
		phone: '',
		is_active: 1
	};

	public formValid = {
		name: true,
	};

	ready = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public dataDialog: any,
		public dialogRef: MatDialogRef<DialogSupplierComponent>,
		private supplierService: SupplierService
	) { }

	ngOnInit(): void {
		if (this.dataDialog) {
			this.setForm();
		}
	}

	setForm() {
		this.id = this.dataDialog.arr.id;
		this.form.name = this.dataDialog.arr.name;
		this.form.address = this.dataDialog.arr.address;
		this.form.phone = this.dataDialog.arr.phone;
		this.form.maps = this.dataDialog.arr.maps;
		this.form.is_active = this.dataDialog.arr.is_active;
	}

	toggleActive(event: any) {
		this.form.is_active = event.target.checked ? 1 : 0;
	}

	submit() {
		this.validator();
		if (this.ready) {
			this.handleSubmit();
		}
	}

	validator() {
		this.formValid.name = this.form.name ? true : false;

		if (this.formValid.name) {
			this.ready = true;
		} else {
			this.ready = false;
		}
	}

	handleSubmit() {
		const body = { id: this.id, ...this.form };
		if (this.id) {
			this.supplierService.updateSupplier(body).subscribe({
				next: (r) => {
					console.log(r)
					this.close(true)
				},
				error: (e) => {
					console.log(e);
					this.close(true)
				}
			});
		} else {
			this.supplierService.insertSupplier(body).subscribe({
				next: (r) => {
					console.log(r)
					this.close(true)
				},
				error: (e) => {
					console.log(e);
					this.close(true)
				}
			});
		}
	}

	close(arr: boolean) {
		this.dialogRef.close(arr);
	}

}
