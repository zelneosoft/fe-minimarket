import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { Supplier } from '../../models/supplier.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class SupplierService {

	root: string = "supplier"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getSupplier(params: any): Observable<{ data: Supplier[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: Supplier[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

	getSupplierById(id: number): Observable<{ data: Supplier[] }> {
		return this.http.get<{ data: Supplier[] }>(`${environment.api.url}${this.root}/${id}`);
	}

	insertSupplier(supplier: Supplier): Observable<{ data: Supplier }> {
		return this.http.post<{ data: Supplier }>(`${environment.api.url}${this.root}`, supplier);
	}

	updateSupplier(supplier: Supplier): Observable<{ data: Supplier }> {
		return this.http.put<{ data: Supplier }>(`${environment.api.url}${this.root}/${supplier.id}`, supplier);
	}
}
