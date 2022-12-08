export interface AuthState {
    userId: null | number,
    username: null | string,
    isLoggedIn: null | boolean,
    page: "home" | "dashboard" | "notification" | "my-work" | "favorite" | "profile"
}