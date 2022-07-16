import CartContext from "./cart-context"
import { useReducer } from "react"

const dispatchIdentifier = {
    add: "ADD",
    remove: "REMOVE"
}

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case dispatchIdentifier.add:
            let updatedItems = state.items.concat(action.item)

            //existingCartItemIndex
            const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

            //existingCartItem
            const existingCartItem = state.items[existingCartItemIndex]


            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                }

                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            } else {

                updatedItems = state.items.concat(action.item)
            }

            const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        case dispatchIdentifier.remove:
            const existCartItemIndex = state.items.findIndex((item) => item.id === action.id)
            const existItem = state.items[existCartItemIndex]
            const updatedTotalAmountRemove = state.totalAmount - existItem.price 

            let updatedItemsRemove

            if (existItem.amount === 1) {
                updatedItemsRemove = state.items.filter(item => item.id !== action.id)
            } else {
                const updatedItem = {...existItem, amount: existItem.amount - 1}
                updatedItemsRemove = [...state.items]
                updatedItemsRemove[existCartItemIndex] = updatedItem
            }

            return {
                items: updatedItemsRemove,
                totalAmount: updatedTotalAmountRemove
            }

        default:
            return defaultCartState
    }
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({type: dispatchIdentifier.add, item: item})
    }
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: dispatchIdentifier.remove, id: id})
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider