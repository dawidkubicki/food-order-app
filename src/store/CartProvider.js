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
            const updatedItems = state.items.concat(action.item)
            const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
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