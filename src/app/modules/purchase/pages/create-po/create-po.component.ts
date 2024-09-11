import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';

@Component({
	selector: 'app-create-po',
	templateUrl: './create-po.component.html',
	styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent implements OnInit {
	public form = {
		id: 0,
		barcode: '',
		name: '',
		description: '',
		category_id: 1,
		brand_id: 0
	};

	public productDetails = [
		{
			id: 111,
			barcode: "1234567890",
			name: "Sampo Sunsilk Hitam",
			purchase_price: 500,
			qty: 24,
			discount: 0,
			total: 12000,
			isEditPrice: false,
			isEditQty: false,
			isEditDiscount: false
		},
		{
			id: 112,
			barcode: "1234567891",
			name: "Sampo Sunsilk Biru",
			purchase_price: 500,
			qty: 24,
			discount: 0,
			total: 12000,
			isEditPrice: false,
			isEditQty: false,
			isEditDiscount: false
		}
	]
	// public productDetails: any = []
	constructor(
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
	}

	// onBlur(product: any, field: string) {
	// 	product.total = this.calculateTotal(product);
	// 	if (!product.discount) {
	// 		product.discount = 0;
	// 	}
	// 	if (!product.qty) {
	// 		product.qty = 0;
	// 	}
	// 	if (!product.purchase_price) {
	// 		product.purchase_price = 0;
	// 	}
	// }

	formatCurrency(value: any): string {
		if (!value) return '0';
		return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 0 });
	}

	// Fungsi untuk toggle antara span dan input
	toggleEdit(product: any, field: string): void {
		if (field === 'price') {
			product.isEditPrice = !product.isEditPrice;
		} else if (field === 'qty') {
			product.isEditQty = !product.isEditQty;
		} else if (field === 'discount') {
			product.isEditDiscount = !product.isEditDiscount;
		}
	}

	// Fungsi untuk menghitung ulang total
	calculateTotal(product: any): number {
		const total = (product.purchase_price * product.qty) - product.discount;
		return total;
	}

	openDialogProduct() {
		let param = {};
		const dialogRef = this.dialog.open(DialogProductComponent, {
			width: '90%',
			maxWidth: '500px',
			height: 'auto',
			...param
		});
		dialogRef.afterClosed().subscribe((r) => {
			if (r) this.ngOnInit();
		});
	}

}
