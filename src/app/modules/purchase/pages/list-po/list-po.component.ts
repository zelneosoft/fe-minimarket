import { Component, OnInit } from '@angular/core';
import { PurchaseListResponse } from '../../../../core/models/purchase.model';
import { PurchaseService } from '../../../../core/services/api/purchase.service';

@Component({
	selector: 'app-list-po',
	templateUrl: './list-po.component.html',
	styleUrls: ['./list-po.component.scss']
})
export class ListPoComponent implements OnInit {

	purchases: PurchaseListResponse[] = [];

	constructor(
		private purchaseService: PurchaseService
	) { }

	ngOnInit(): void {
		this.loadPOList();
	}

	loadPOList() {
		let params = {
			search: ""
		};
		this.purchaseService.getPOList(params).subscribe({
			next: (r) => {
				this.purchases = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

}
