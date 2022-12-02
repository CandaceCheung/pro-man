import { AuthAction } from "./action";
import { AuthState } from "./state";

const initState: AuthState = {
    username: "",
    isLoggedIn: null
};

export const authReducer = (state: AuthState = initState, action: AuthAction): AuthState => {
    let result = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "AUTH/LOGIN":
            result.username = action.username;
            result.isLoggedIn = true;
            break;
        case "AUTH/FAILED":
            console.error("Failed");
            break;
        default:
            break;
    }
    return result;
}