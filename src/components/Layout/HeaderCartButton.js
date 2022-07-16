import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../store/cart-context"
import { useContext, useEffect, useState } from "react"

const HeaderCartButton = (props) => {

    const [btnIsHihglighted, setBtnisHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)

    const {items} = cartCtx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber+item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHihglighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnisHighlighted(true)
        const timer = setTimeout(()=>{
            setBtnisHighlighted(false)
        }, 200)

        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton