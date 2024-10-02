import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { ShippingMethod } from '../../models/shipping.method';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class ShippingMethodService {

	root: string = "shipping-method"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getShippingMethod(params: any): Observable<{ data: ShippingMethod[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: ShippingMethod[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

}
