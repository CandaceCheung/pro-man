export function loginAction(username: string) {
    return {
        type: "AUTH/LOGIN" as const,
        username
    }
}

export function failedLoginAction() {
    return {
        type: "AUTH/FAILED" as const
    }
}

export type AuthAction = 
    ReturnType <typeof loginAction> |
    ReturnType <typeof failedLoginAction>;