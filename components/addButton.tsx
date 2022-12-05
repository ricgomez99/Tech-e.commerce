import { useAppContext } from "./statewrapper";
import style from "../styles/addButton.module.css";
import { useEffect, useState } from "react";

export default function AddButton({ item }: any) {
  const cart = useAppContext();

  const [available, setAvailable] = useState(true);

  function handleClick() {
    cart.addItemToCart(item);
    cart.openCart();
  }

  useEffect(() => {
    const itemCart = cart.items.find((e: any) => e.id === item.id);
    if (itemCart) {
      itemCart.qty < item.stock ? setAvailable(true) : setAvailable(false);
    } else setAvailable(true);
  }, [cart.items]);

  return (
    <>
      {available ? (
        <div>
          <button className={style.addBtn} onClick={handleClick}>
            Add to cart
          </button>
        </div>
      ) : (
        <button className={style.addBtn} disabled>
          Stock exceeded
        </button>
      )}
    </>
  );
}
