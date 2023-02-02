export interface AuthState {
    userId: null | number;
    username: null | string;
    isLoggedIn: null | boolean;
    token: null | string;
}

export interface RetrieveLoginUserInfo {
    id: number;
    username: string;
}
