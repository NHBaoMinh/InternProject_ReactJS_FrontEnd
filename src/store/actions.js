import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, EMPTY_CART } from "./constants";

export const addItem = (payload) => ({
    type: ADD_ITEM,
    payload,
});

export const removeItem = (payload) => ({
    type: REMOVE_ITEM,
    payload,
});

export const updateItem = (payload) => ({
    type: UPDATE_ITEM,
    payload,
});

export const emptyCart = (payload) => ({
    type: EMPTY_CART,
    payload,
});
