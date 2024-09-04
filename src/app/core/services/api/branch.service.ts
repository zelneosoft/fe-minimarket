import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { Branch } from '../../models/branch.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class BranchService {

	root: string = "branch"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getBranch(params: any): Observable<{ data: Branch[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: Branch[] }>(`${environment.api.url}${this.root}`, { params: httpParams });
	}

	getBranchById(id: number): Observable<{ data: Branch[] }> {
		return this.http.get<{ data: Branch[] }>(`${environment.api.url}${this.root}/${id}`);
	}

	insertBranch(branch: Branch): Observable<{ data: Branch }> {
		return this.http.post<{ data: Branch }>(`${environment.api.url}${this.root}`, branch);
	}

	updateBranch(branch: Branch): Observable<{ data: Branch }> {
		return this.http.put<{ data: Branch }>(`${environment.api.url}${this.root}/${branch.id}`, branch);
	}
}
