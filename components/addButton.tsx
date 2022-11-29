import { useAppContext } from "./statewrapper";

export default function AddButton({ item }: any) {
  const cart = useAppContext();

  function handleClick() {
    cart.addItemToCart(item);
    cart.openCart();
  }
  return <button onClick={handleClick}>Add to cart</button>;
}
