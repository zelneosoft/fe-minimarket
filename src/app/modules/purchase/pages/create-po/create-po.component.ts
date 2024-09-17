import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Branch } from '../../../../core/models/branch.model';
import { Supplier } from '../../../../core/models/supplier.model';
import { BranchService } from '../../../../core/services/api/branch.service';
import { SupplierService } from '../../../../core/services/api/supplier.service';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';

@Component({
	selector: 'app-create-po',
	templateUrl: './create-po.component.html',
	styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent implements OnInit {

	supplier: Supplier[] = [];
	branch: Branch[] = [];

	public form = {
		id: 0,
		date: '',
		supplier_id: 0,
		supplier_address: '',
		branch_id: 0,
		payment_method: 0,
		shipping_method: 0,
		status: 1
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

	constructor(
		public dialog: MatDialog,
		private supplierService: SupplierService,
		private branchService: BranchService
	) { }

	ngOnInit(): void {
		this.loadSupplier();
		this.loadBranch();
	}

	loadSupplier(): void {
		let params = {
			search: "",
			isActive: 1
		};
		this.supplierService.getSupplier(params).subscribe({
			next: (r) => {
				this.supplier = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	loadBranch(): void {
		let params = {
			search: "",
			isActive: 1
		};
		this.branchService.getBranch(params).subscribe({
			next: (r) => {
				this.branch = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	onSupplierChange() {
		const selectedSupplier = this.supplier.find(s => s.id == this.form.supplier_id);
		if (selectedSupplier) {
			this.form.supplier_address = selectedSupplier.address;
		} else {
			this.form.supplier_address = '-';
		}
	}

	formatCurrency(value: any): string {
		if (!value) return '0';
		return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 0 });
	}

	toggleEdit(product: any, field: string): void {
		if (field === 'price') {
			product.isEditPrice = !product.isEditPrice;
		} else if (field === 'qty') {
			product.isEditQty = !product.isEditQty;
		} else if (field === 'discount') {
			product.isEditDiscount = !product.isEditDiscount;
		}
	}

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
