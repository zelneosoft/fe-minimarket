import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(public loadingService: LoadingService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (window.navigator.onLine) {
			this.loadingService.show();
			return next.handle(req).pipe(finalize(() => this.loadingService.hide()));
		} else {
			return next.handle(req).pipe(finalize(() => this.loadingService.hide()));
		}
	}
}
