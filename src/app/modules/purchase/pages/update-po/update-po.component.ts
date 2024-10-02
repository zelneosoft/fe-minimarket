import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Branch } from '../../../../core/models/branch.model';
import { PaymentMethod } from '../../../../core/models/payment.method.model';
import { ShippingMethod } from '../../../../core/models/shipping.method';
import { Supplier } from '../../../../core/models/supplier.model';
import { BranchService } from '../../../../core/services/api/branch.service';
import { PaymentMethodService } from '../../../../core/services/api/payment.method.service';
import { PurchaseService } from '../../../../core/services/api/purchase.service';
import { ShippingMethodService } from '../../../../core/services/api/shipping.method.service';
import { SupplierService } from '../../../../core/services/api/supplier.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';

interface ProductDetail {
	id: number;
	item_id: number;
	barcode: string;
	name: string;
	purchase_price: number;
	qty: number;
	discount: number;
	total: number;
	isEditPrice: boolean;
	isEditQty: boolean;
	isEditDiscount: boolean;
}

@Component({
	selector: 'app-update-po',
	templateUrl: './update-po.component.html',
	styleUrls: ['./update-po.component.scss']
})
export class UpdatePoComponent implements OnInit {

	supplier: Supplier[] = [];
	branch: Branch[] = [];
	payment: PaymentMethod[] = [];
	shipping: ShippingMethod[] = [];

	public form = {
		id: "",
		status: "OPEN",
		purchase_date: '',
		supplier_id: 0,
		supplier_address: '',
		branch_id: 0,
		payment_method_id: 0,
		shipping_method_id: 0,
		shipping_amount: 0,
		grand_total: 0,
		grand_total_discount: 0,
	};

	public productDetails: ProductDetail[] = [];

	public formValid = {
		date: true,
		supplier: true,
		branch: true,
		payment: true,
		shipping: true,
		status: true,
	};

	ready = false;

	constructor(
		private activeRoute: ActivatedRoute,
		private purchaseService: PurchaseService,
		private supplierService: SupplierService,
		private paymentMethodService: PaymentMethodService,
		private shippingMethodService: ShippingMethodService,
		private branchService: BranchService,
		public dialog: MatDialog,
		public router: Router,
		private snackbarService: SnackbarService,
		private translate: TranslateService,
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
		this.loadSupplier();
		this.loadBranch();
		this.loadPaymentMethod();
		this.loadShippingMethod();
	}

	loadSupplier(): void {
		let params = {
			search: "",
			isActive: 1
		};
		this.supplierService.getSupplier(params).subscribe({
			next: (r) => {
				this.supplier = r.data;
				this.onSupplierChange()
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

	loadDetail() {
		this.purchaseService.getPOByID(this.form.id).subscribe({
			next: (r) => {
				Object.assign(this.form, r.data[0]);
				const purchaseLines = r.data[0].purchase_lines;
				this.productDetails = purchaseLines.map((line: any) => ({
					id: line.id,
					item_id: line.item_id,
					barcode: line.item.barcode,
					name: line.item.name,
					purchase_price: line.item_price ?? 0,
					qty: line.item_qty ?? 0,
					discount: line.item_discount ?? 0,
					total: line.item_total ?? 0,
					isEditPrice: false,
					isEditQty: false,
					isEditDiscount: false,
				}));
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	loadPaymentMethod(): void {
		let params = {
			"search": "",
			"for-purchase": 1
		};
		this.paymentMethodService.getPaymentMethod(params).subscribe({
			next: (r) => {
				this.payment = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	loadShippingMethod(): void {
		let params = {
			"search": "",
		};
		this.shippingMethodService.getShippingMethod(params).subscribe({
			next: (r) => {
				this.shipping = r.data;
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

	calculateGrandTotal() {
		if (!this.productDetails || this.productDetails.length === 0) {
			this.form.grand_total = 0;
			this.form.grand_total_discount = 0;
			return { total: 0, discount: 0 };
		}

		const result = this.productDetails.reduce((acc, product) => {
			const total = this.calculateTotal(product);
			return {
				total: acc.total + total,
				discount: acc.discount + product.discount
			};
		}, { total: 0, discount: 0 });

		this.form.grand_total = result.total;
		this.form.grand_total_discount = result.discount;

		return result;
	}

	openDialogProduct() {
		let param = {};
		const dialogRef = this.dialog.open(DialogProductComponent, {
			width: '90%',
			maxWidth: '400px',
			height: 'auto',
			...param
		});
		dialogRef.afterClosed().subscribe((r) => {
			if (r.status_close) {
				const existingProduct = this.productDetails.find(p => p.item_id === r.id);

				if (existingProduct) {
					existingProduct.qty += 1;
				} else {
					const productDetail: ProductDetail = {
						id: r.id,
						item_id: r.id,
						barcode: r.barcode,
						name: r.name,
						purchase_price: r.purchase_price ?? 0,
						qty: 1,
						discount: r.discount ?? 0,
						total: r.total ?? 0,
						isEditPrice: false,
						isEditQty: false,
						isEditDiscount: false
					};
					this.productDetails.push(productDetail);
				}
			}
		});
	}

	deleteProduct(index: number): void {
		this.productDetails.splice(index, 1);
	}

	close() {
		this.router.navigate(['purchase/po/']);
	}

	submit() {
		this.validator();
		if (this.ready) {
			this.handleSubmit();
		} else {
			this.translate.get('all-required').subscribe((translatedText: string) => {
				this.snackbarService.showErrorSnackbar(translatedText);
			});
		}
	}

	validator() {
		this.formValid.date = this.form.purchase_date ? true : false;
		this.formValid.supplier = this.form.supplier_id ? true : false;
		this.formValid.branch = this.form.branch_id ? true : false;
		this.formValid.payment = this.form.payment_method_id ? true : false;
		this.formValid.shipping = this.form.shipping_method_id ? true : false;
		this.formValid.status = this.form.status ? true : false;

		if (this.formValid.date && this.formValid.supplier && this.formValid.branch && this.formValid.payment && this.formValid.shipping && this.formValid.status) {
			if (this.productDetails.length > 0) {
				this.ready = true;
			} else {
				this.ready = false;
			}
		} else {
			this.ready = false;
		}
	}

	handleSubmit() {
		const body = {
			id: this.form.id,
			date: Date.parse(this.form.purchase_date),
			status: this.form.status,
			supplier_id: this.form.supplier_id,
			branch_id: this.form.branch_id,
			payment_method_id: this.form.payment_method_id,
			shipping_method_id: this.form.shipping_method_id,
			shipping_amount: this.form.shipping_amount,
			discount_amount: this.form.grand_total_discount,
			total_amount: (this.form.grand_total + this.form.shipping_amount),
			items: this.productDetails.map(product => ({
				item_id: product.item_id,
				item_price: product.purchase_price,
				item_discount: product.discount,
				item_qty: product.qty,
				item_total: this.calculateTotal(product)
			}))
		};
		this.purchaseService.updatePO(body).subscribe({
			next: (r) => {
				this.snackbarService.showSuccessSnackbar("Success updated " + body.id);
				this.close();
			},
			error: (e) => {
				console.error('Failed', e.error.message);
				this.snackbarService.showErrorSnackbar(e.error.message);
			}
		});
	}

}
