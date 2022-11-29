import { useAppContext } from "./statewrapper";
import Product from "./product";
import style from "../styles/shoppingcart.module.css";
import { BsFillXCircleFill } from "react-icons/bs";

export default function ShoppingCart() {
    const cart = useAppContext();

    const handleCloseCart = () => {
        cart.closeCart()
    }
    const getTotal = () => {
        const total = cart.items.reduce((acc, item)=> acc+ item.qty * item.price, 0);
        return total;
    }

    return(
    <div className={style.shoppingCart} style={{display: cart.isOpen ? "block" : "none"}} >
        <div>
            <button onClick={handleCloseCart} className={style.button}><BsFillXCircleFill /></button>
        </div>
            {!cart.items.length ? (
            <div className={style.empty}>
                Cart is empty
            </div>): (
            <>
                <h3>items</h3>
                <div>
                    {cart.items.map((item)=>(
                        <Product key={item.id} product={item} showAs="ListItem" qty={item.qty} />
                    ))}
                </div>
                <div>
                    Total: ${getTotal()}
                </div>
            </>)}
    </div>
    )
}