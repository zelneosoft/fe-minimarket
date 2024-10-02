import { Supplier } from "./supplier.model";

export interface PurchaseListResponse {
	id: string;
	purchase_date: string;
	status: string;
	total_amount: number;
	supplier: Supplier;
}