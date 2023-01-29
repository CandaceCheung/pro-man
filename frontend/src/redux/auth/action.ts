export function loginAction(userId: number, username: string) {
    return {
        type: 'AUTH/LOGIN' as const,
        userId,
        username
    };
}

export function logoutAction() {
    return {
        type: 'AUTH/LOGOUT' as const
    };
}

export type AuthAction = ReturnType<typeof loginAction> | ReturnType<typeof logoutAction>;
