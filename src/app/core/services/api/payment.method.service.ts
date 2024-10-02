import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { PaymentMethod } from '../../models/payment.method.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class PaymentMethodService {

	root: string = "payment-method"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getPaymentMethod(params: any): Observable<{ data: PaymentMethod[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: PaymentMethod[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

}
