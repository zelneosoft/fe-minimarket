import { Brand } from "./brand.model";
import { Category } from "./category.model";

export interface Product {
	id: number;
	barcode: string;
	name: string;
	description: string;
	category_id: number;
	brand_id: number;
}

export interface ProductResponse {
	purchase_lines: any;
	id: number;
	barcode: string;
	name: string;
	description: string;
	category_id: number;
	brand_id: number;
	created_at: string;
	updated_at: string;
	category: Category;
	brand: Brand;
	purchase_price: number;
	sales_price: number;
}

export interface ProductForPurchaseResponse {
	id: number;
	barcode: string;
	name: string;
	description: string;
	category_id: number;
	brand_id: number;
	created_at: string;
	updated_at: string;
	category: Category;
	brand: Brand;
}
