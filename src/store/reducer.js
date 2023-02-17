import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, EMPTY_CART } from "./constants";

const initState = {
    cart: [],
};

function changeQTY(productID, newQTY, array) {
    for (var i in array) {
        if (array[i].ProductID === productID) {
            array[i].QTY = newQTY;
            break;
        }
    }
    return array;
}

function reducer(state, action) {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, cart: [...state.cart, action.payload] };
        case REMOVE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(function (item) {
                    return item.ProductID !== action.payload;
                }),
            };
        case UPDATE_ITEM:
            return {
                ...state,
                cart: [
                    changeQTY(
                        action.payload.ProductID,
                        action.payload.QTY,
                        state.cart
                    ),
                ],
            };
        case EMPTY_CART:
            return {
                ...state,
                cart: [],
            };
        default:
            throw new Error("Cart Reducer Error: Invalid Action");
    }
}

export { initState };
export default reducer;
