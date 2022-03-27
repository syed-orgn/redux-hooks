const initialState = 0;
export const changeTheNumber = (state = initialState, action) => {
    switch (action.type) {
        case 'incr':
            return state + action.payload;
        case 'decr':
            return state > 1 ? state - 1 : 0
        default: return state;
    }
}

// export default changeTheNumber;