import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Warehouse } from '../../../../core/models/warehouse.model';
import { WarehouseService } from '../../../../core/services/api/warehouse.service';
import { DialogWarehouseComponent } from '../../components/dialog-warehouse/dialog-warehouse.component';

@Component({
	selector: 'app-list-warehouse',
	templateUrl: './list-warehouse.component.html',
	styleUrls: ['./list-warehouse.component.scss']
})
export class ListWarehouseComponent implements OnInit {

	warehouses: Warehouse[] = [];
	search: string = '';
	searchUpdate = new Subject<string>();

	constructor(
		public dialog: MatDialog,
		private warehouseService: WarehouseService
	) {
		this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		this.loadWarehouses();
	}

	loadWarehouses(): void {
		let params = {
			search: this.search
		};
		this.warehouseService.getWarehouse(params).subscribe({
			next: (r) => {
				this.warehouses = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	openDialogWarehouse(edited: boolean, arr: any) {
		let param = {};
		if (edited) {
			param = { data: { arr } };
		}
		const dialogRef = this.dialog.open(DialogWarehouseComponent, {
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
