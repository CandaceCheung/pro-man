export interface AuthState {
    userId: null | number;
    username: null | string;
    isLoggedIn: null | boolean;
}

export interface RetrieveLoginUserInfo {
	id: number;
	username: string;
}