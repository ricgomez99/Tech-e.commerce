import { useAppContext } from "./statewrapper";
import style from "../styles/addButton.module.css";

export default function AddButton({ item }: any) {
  const cart = useAppContext();
  let temp: any = [];
  if(cart.items.length){
    let temp = [...cart.items]
  }
  console.log(temp)
  const found = temp.find((product: any) => product.id === item.id)

  function handleClick() {
    cart.addItemToCart(item);
    cart.openCart();
  }
  
  return (
    <>
    {found && found.qty ? (found.qty < found.stock ? (<div>
    <button className={style.addBtn} onClick={handleClick}>
      Add to cart
    </button>
    </div>) : (<button disabled>Stock exceeded</button>)) : (<div>
    <button className={style.addBtn} onClick={handleClick}>
      Add to cart
    </button>
    </div>)}
    </>
  );
}
