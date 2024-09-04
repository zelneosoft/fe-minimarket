import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BearerHandler } from '../../handlers/bearer.hendler';
import { Brand } from '../../models/brand.model';
import { Category } from '../../models/category.model';
import { Product, ProductResponse } from '../../models/product.model';
import { toHttpParams } from '../../utils/http.params';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	root: string = "product"

	protected readonly http: HttpClient;

	constructor(bearerHandler: BearerHandler) {
		this.http = new HttpClient(bearerHandler);
	}

	getBrand(params: any): Observable<{ data: Brand[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: Brand[] }>(`${environment.api.url}${this.root}/brand`, { params: httpParams });
	}

	getCategory(params: any): Observable<{ data: Category[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: Category[] }>(`${environment.api.url}${this.root}/category`, { params: httpParams });
	}

	insertCategory(category: Category): Observable<{ data: Category }> {
		return this.http.post<{ data: Category }>(`${environment.api.url}${this.root}/category`, category);
	}

	insertBrand(brand: Brand): Observable<{ data: Category }> {
		return this.http.post<{ data: Category }>(`${environment.api.url}${this.root}/brand`, brand);
	}

	updateCategory(category: Category): Observable<{ data: Category }> {
		return this.http.put<{ data: Category }>(`${environment.api.url}${this.root}/category/${category.id}`, category);
	}

	updateBrand(brand: Brand): Observable<{ data: Category }> {
		return this.http.put<{ data: Category }>(`${environment.api.url}${this.root}/brand/${brand.id}`, brand);
	}

	insertProduct(product: Product): Observable<{ data: Product }> {
		return this.http.post<{ data: Product }>(`${environment.api.url}${this.root}`, product);
	}

	updateProduct(product: Product): Observable<{ data: Product }> {
		return this.http.put<{ data: Product }>(`${environment.api.url}${this.root}/${product.id}`, product);
	}

	getProduct(params: any): Observable<{ data: ProductResponse[] }> {
		const httpParams = toHttpParams(params);
		return this.http.get<{ data: ProductResponse[] }>(`${environment.api.url}${this.root}/`, { params: httpParams });
	}

	getProductById(id: number): Observable<{ data: ProductResponse[] }> {
		return this.http.get<{ data: ProductResponse[] }>(`${environment.api.url}${this.root}/${id}`);
	}
}
