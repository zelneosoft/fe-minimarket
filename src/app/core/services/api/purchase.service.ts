import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { ProductResponse } from '../../models/product.model';
import { PurchaseListResponse } from '../../models/purchase.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class PurchaseService {

	root: string = "purchase"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getPOList(params: any): Observable<{ data: PurchaseListResponse[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: PurchaseListResponse[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

	getProduct(params: any): Observable<{ data: ProductResponse[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: ProductResponse[] }>(`${environment.api.url}${this.root}/product`, { params: httpParams });
	}

	insertPO(dataPO: any): Observable<{ data: any }> {
		return this.http.post<{ data: any }>(`${environment.api.url}${this.root}`, dataPO);
	}

	getPOByID(id: string): Observable<{ data: ProductResponse[] }> {
		return this.http.get<{ data: ProductResponse[] }>(`${environment.api.url}${this.root}/detail/${id}`);
	}

	updatePO(dataPO: any): Observable<{ data: any }> {
		return this.http.put<{ data: any }>(`${environment.api.url}${this.root}/${dataPO.id}`, dataPO);
	}
}
