import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"
import CartContext from "../../../store/cart-context"
import { useContext } from "react"

const MealItem = (props) => {

    const cartCtx = useContext(CartContext)

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal} key={props.id}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${props.price}</div>
            </div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
        </li>
    )
}

export default MealItem