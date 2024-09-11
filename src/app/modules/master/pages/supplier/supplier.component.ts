import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Supplier } from '../../../../core/models/supplier.model';
import { SupplierService } from '../../../../core/services/api/supplier.service';
import { DialogSupplierComponent } from '../../components/dialog-supplier/dialog-supplier.component';

@Component({
	selector: 'app-supplier',
	templateUrl: './supplier.component.html',
	styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {


	supplier: Supplier[] = [];
	search: string = '';
	searchUpdate = new Subject<string>();

	constructor(
		private supplierService: SupplierService,
		public dialog: MatDialog
	) {
		this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		this.loadSupplier();
	}

	loadSupplier(): void {
		let params = {
			search: this.search
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

	openDialogCategory(edited: boolean, arr: any) {
		let param = {};
		if (edited) {
			param = { data: { arr } };
		}
		const dialogRef = this.dialog.open(DialogSupplierComponent, {
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
