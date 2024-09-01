import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	public isLoading = new Subject<boolean>();
	public disabled!: boolean;

	constructor() { }

	public show() {
		if (!this.disabled) {
			this.isLoading.next(true);
		}
	}

	public hide() {
		if (!this.disabled) {
			this.isLoading.next(false);
		}
	}
}
