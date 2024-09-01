import { HttpParams } from '@angular/common/http';

export function toHttpParams(params: any): HttpParams {
	let httpParams = new HttpParams();
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			httpParams = httpParams.set(key, params[key]);
		}
	}
	return httpParams;
}