export interface LoginResponse {
	data: {
		token: string;
	};
}

export interface LoginRequest {
	email: string;
	password: string;
}