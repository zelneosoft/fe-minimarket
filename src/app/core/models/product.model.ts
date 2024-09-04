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
