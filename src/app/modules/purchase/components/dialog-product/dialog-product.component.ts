import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductResponse } from '../../../../core/models/product.model';
import { PurchaseService } from '../../../../core/services/api/purchase.service';


@Component({
	selector: 'app-dialog-product',
	templateUrl: './dialog-product.component.html',
	styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

	id: number = 0;
	public form = {
		name: '',
		is_active: 1
	};

	public formValid = {
		name: true,
	};

	ready = false;

	products: ProductResponse[] = [];
	selectedProduct: ProductResponse | null = null;

	constructor(
		public dialogRef: MatDialogRef<DialogProductComponent>,
		private purchaseService: PurchaseService
	) { }


	ngOnInit(): void {
		this.loadProduct();
	}

	loadProduct() {
		let params = {
			search: ""
		};
		this.purchaseService.getProduct(params).subscribe({
			next: (r) => {
				this.products = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	selectItem(item: ProductResponse) {
		this.selectedProduct = item;
	}

	toggleActive(event: any) {
		this.form.is_active = event.target.checked ? 1 : 0;
	}

	close(arr: boolean) {
		this.dialogRef.close({ status_close: arr, ...this.selectedProduct });
	}

}
