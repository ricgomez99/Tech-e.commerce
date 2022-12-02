import { useAppContext } from "./statewrapper";
import style from "../styles/addButton.module.css";

export default function AddButton({ item }: any) {
  const cart = useAppContext();

  function handleClick() {
    cart.addItemToCart(item);
    cart.openCart();
  }
  
  return (
    <>
    {item.qty ? (item.qty < item.stock ? (<div>
    <button className={style.addBtn} onClick={handleClick}>
      Add to cart
    </button>
    </div>) : (<p>Exceding stock</p>)) : (<div>
    <button className={style.addBtn} onClick={handleClick}>
      Add to cart
    </button>
    </div>)}
    </>
  );
}
