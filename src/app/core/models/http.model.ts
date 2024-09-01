export interface HttpResponse<T> {
	url(url: any): unknown;
	code: string;
	error: string;
	data: T;
	message: string;
}
