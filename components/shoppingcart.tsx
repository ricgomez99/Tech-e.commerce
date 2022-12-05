import { useAppContext } from "./statewrapper";
import Product from "./product";
import style from "../styles/shoppingcart.module.css";
import { BsFillXCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ShoppingCart() {
  const cart = useAppContext();
  const { events } = useRouter();

  const [emptyCart, setEmptyCart] = useState(true);

  useEffect(() => {
    events.on("routeChangeStart", handleCloseCart);
    cart.getCart();
    cart.updateCart();
    cart.items.length ? setEmptyCart(false) : setEmptyCart(true);
  }, [cart.updateCart, cart.addItemToCart, cart.deleteItem]);

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
      {emptyCart ? (
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
          <Link href="/payment">
            <button
              style={{ cursor: "pointer", width: "150px", height: "40px" }}
              className="btn btn-success"
            >
              Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
