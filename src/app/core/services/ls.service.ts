import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	saveToken(value: string): void {
		localStorage.setItem('token', value);
	}

	getToken(): string {
		return localStorage.getItem('token') || '';
	}

	deleteToken(): void {
		localStorage.removeItem('token');
	}

	saveLang(value: string): void {
		localStorage.setItem('language', value);
	}

	getlang(): string {
		return localStorage.getItem('language') || '';
	}

	clear(): void {
		localStorage.clear();
	}

}
