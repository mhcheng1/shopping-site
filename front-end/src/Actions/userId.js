export const userId = (user_id) => {
    return {
        type: 'SIGN_IN',
        payload: user_id
    }
}