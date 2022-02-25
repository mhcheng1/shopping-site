const receiptReducer = (state = "", action) => {
    switch (action.type) {
        case 'ORDER_COMPLETE':
            return action.payload
        default:
            return state
    }
}
export default receiptReducer;