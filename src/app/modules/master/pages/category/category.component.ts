import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Category } from '../../../../core/models/category.model';
import { ProductService } from '../../../../core/services/api/product.service';
import { DialogCategoryComponent } from '../../components/dialog-category/dialog-category.component';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

	categories: Category[] = [];
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
		this.loadCategories();
	}

	loadCategories(): void {
		let params = {
			search: this.search
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

	openDialogCategory(edited: boolean, arr: any) {
		let param = {};
		if (edited) {
			param = { data: { arr } };
		}
		const dialogRef = this.dialog.open(DialogCategoryComponent, {
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
