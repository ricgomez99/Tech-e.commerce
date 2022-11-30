import { useAppContext } from "./statewrapper";
import Product from "./product";
import style from "../styles/shoppingcart.module.css";
import { BsFillXCircleFill } from "react-icons/bs";

import { useEffect } from "react";

export default function ShoppingCart() {
  const cart = useAppContext();

  if (typeof window !== "undefined") {
    cart.updateCart();
  }

  //   const getCart = () => {
  //     if (typeof window !== "undefined") {
  //       const cartJSON = localStorage.getItem("carrito");
  //       return cartJSON !== null ? JSON.parse(cartJSON) : "{}";
  //     }
  //     return;
  //   };
  useEffect(() => {
    cart.getCart();
  }, []);
  const currentCart = cart.items;

  const handleCloseCart = () => {
    cart.closeCart();
  };
  const getTotal = () => {
    const total = cart.items.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    return total;
  };

  return (
    <div
      className={style.shoppingCart}
      style={{ display: cart.isOpen ? "block" : "none" }}
    >
      <div>
        <button onClick={handleCloseCart} className={style.button}>
          <BsFillXCircleFill />
        </button>
      </div>
      {!currentCart?.length ? (
        <div className={style.empty}>Cart is empty</div>
      ) : (
        <>
          <h3>items</h3>
          <div>
            {currentCart.map((item: any) => (
              <Product
                key={item.id}
                product={item}
                showAs="ListItem"
                qty={item.qty}
              />
            ))}
          </div>
          <div>Total: ${getTotal()}</div>
        </>
      )}
    </div>
  );
}
