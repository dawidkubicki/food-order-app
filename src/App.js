import React from "react";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

  const toggleCart = () => {
    setCartIsShown(prevValue => !prevValue)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClick={toggleCart}/>}
      <Header onClick={toggleCart}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
