import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Brand } from '../../../../../core/models/brand.model';
import { Category } from '../../../../../core/models/category.model';
import { ProductService } from '../../../../../core/services/api/product.service';
import { SnackbarService } from '../../../../../core/services/snackbar.service';

@Component({
	selector: 'app-update-product',
	templateUrl: './update-product.component.html',
	styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

	categories: Category[] = [];
	brands: Brand[] = [];

	public form = {
		id: 0,
		barcode: '',
		name: '',
		description: '',
		category_id: 0,
		brand_id: 0
	};

	public formValid = {
		barcode: true,
		name: true,
		category: true,
		brand: true,
	};

	ready = false;

	constructor(
		private productService: ProductService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private snackbarService: SnackbarService,
		private translate: TranslateService
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
		this.loadBrands();
		this.loadCategories();
	}

	loadDetail() {
		this.productService.getProductById(this.form.id).subscribe({
			next: (r) => {
				Object.assign(this.form, r.data[0]);
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	loadCategories(): void {
		let params = {
			search: ""
		};
		this.productService.getCategory(params).subscribe({
			next: (r) => {
				this.categories = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	loadBrands(): void {
		let params = {
			search: ""
		};
		this.productService.getBrand(params).subscribe({
			next: (r) => {
				this.brands = r.data;
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
		this.formValid.barcode = this.form.barcode ? true : false;
		this.formValid.name = this.form.name ? true : false;
		this.formValid.category = this.form.category_id !== 0 ? true : false;
		this.formValid.brand = this.form.brand_id !== 0 ? true : false;

		// Manual convert string to int
		this.form.category_id = +this.form.category_id;
		this.form.brand_id = +this.form.brand_id;
		// end convert

		if (this.formValid.barcode && this.formValid.name && this.formValid.category && this.formValid.brand) {
			this.ready = true;
		} else {
			this.ready = false;
		}
	}

	handleSubmit() {
		const body = this.form;
		this.productService.updateProduct(body).subscribe({
			next: (r) => {
				this.translate.get('success_update', { name: body.name }).subscribe((translatedText: string) => {
					this.snackbarService.showSuccessSnackbar(translatedText);
				});
				this.close();
			},
			error: (e) => {
				console.error('Failed', e.error.message);
				this.snackbarService.showErrorSnackbar(e.error.message);
			}
		});
	}

	close() {
		this.router.navigate(['master/products/']);
	}

}
