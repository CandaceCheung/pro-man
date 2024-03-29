export function loginAction(userId: number, username: string, token: string) {
    return {
        type: 'AUTH/LOGIN' as const,
        userId,
        username,
        token
    };
}

export function logoutAction() {
    return {
        type: 'AUTH/LOGOUT' as const
    };
}

export type AuthAction = ReturnType<typeof loginAction> | ReturnType<typeof logoutAction>;
