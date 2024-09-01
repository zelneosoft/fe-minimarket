import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models/authentication.model';
import { LocalStorageService } from '../ls.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient, private ls: LocalStorageService) { }

	login(body: LoginRequest): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${environment.api.url}auth/login`, body);
	}

	isLoggedIn(): boolean {
		return !!localStorage.getItem('token');
	}

}
