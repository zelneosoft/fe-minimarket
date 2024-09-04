import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductResponse } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/api/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	products: ProductResponse[] = [];

	constructor(
		public translate: TranslateService,
		public router: Router,
		private productService: ProductService
	) { }

	ngOnInit(): void {
		this.loadProduct();
	}

	loadProduct() {
		let params = {
			search: ""
		};
		this.productService.getProduct(params).subscribe({
			next: (r) => {
				this.products = r.data;
				console.log(r.data)
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

}
