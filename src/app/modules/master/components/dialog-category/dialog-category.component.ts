import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../core/services/api/product.service';

@Component({
	selector: 'app-dialog-category',
	templateUrl: './dialog-category.component.html',
	styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

	id: number = 0;
	public form = {
		name: '',
		color: '',
		is_active: 1
	};

	public formValid = {
		name: true,
	};

	ready = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public dataDialog: any,
		public dialogRef: MatDialogRef<DialogCategoryComponent>,
		private productService: ProductService
	) { }

	ngOnInit(): void {
		if (this.dataDialog) {
			this.setForm();
		}
	}

	setForm() {
		this.id = this.dataDialog.arr.id;
		this.form.name = this.dataDialog.arr.name;
		this.form.color = this.dataDialog.arr.color;
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
			this.productService.updateCategory(body).subscribe({
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
			this.productService.insertCategory(body).subscribe({
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
