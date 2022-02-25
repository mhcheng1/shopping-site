export const receiptUrl = (url) => {
    return {
        type: 'ORDER_COMPLETE',
        payload: url
    }
}