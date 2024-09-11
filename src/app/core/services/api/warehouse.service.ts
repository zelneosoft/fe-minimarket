import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { Supplier } from '../../models/supplier.model';
import { Warehouse } from '../../models/warehouse.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class WarehouseService {

	root: string = "warehouse"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getWarehouse(params: any): Observable<{ data: Warehouse[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: Warehouse[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

	getSupplierById(id: number): Observable<{ data: Supplier[] }> {
		return this.http.get<{ data: Supplier[] }>(`${environment.api.url}${this.root}/${id}`);
	}

	insertWarehouse(warehouse: Warehouse): Observable<{ data: Warehouse }> {
		return this.http.post<{ data: Warehouse }>(`${environment.api.url}${this.root}`, warehouse);
	}

	updateSupplier(warehouse: Warehouse): Observable<{ data: Warehouse }> {
		return this.http.put<{ data: Warehouse }>(`${environment.api.url}${this.root}/${warehouse.id}`, warehouse);
	}
}
