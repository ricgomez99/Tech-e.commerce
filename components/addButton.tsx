import { useAppContext } from "./statewrapper";
import style from "../styles/addButton.module.css";

export default function AddButton({ item }: any) {
  const cart = useAppContext();

  function handleClick() {
    cart.addItemToCart(item);
    cart.openCart();
  }
  return (
    <button className={style.addBtn} onClick={handleClick}>
      Add to cart
    </button>
  );
}
