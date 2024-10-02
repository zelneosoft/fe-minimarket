export interface PaymentMethod {
	id: number;
	name: string;
	is_active: number;
	is_active_for_sales: number;
	is_active_for_purchase: number;
}