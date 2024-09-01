import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Brand } from '../../../../core/models/brand.model';
import { ProductService } from '../../../../core/services/api/product.service';
import { DialogBrandComponent } from '../../components/dialog-brand/dialog-brand.component';

@Component({
	selector: 'app-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

	brands: Brand[] = [];
	search: string = '';
	searchUpdate = new Subject<string>();

	constructor(
		private productService: ProductService,
		public dialog: MatDialog
	) {
		this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		this.loadBrand();
	}

	loadBrand(): void {
		let params = {
			search: this.search
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

	openDialogBrand(edited: boolean, arr: any) {
		let param = {};
		if (edited) {
			param = { data: { arr } };
		}
		const dialogRef = this.dialog.open(DialogBrandComponent, {
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
