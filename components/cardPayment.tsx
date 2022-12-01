import styles from "../styles/cardPayment.module.css";
import { useAppContext } from "./statewrapper";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export default function CardPayment() {

  const products = useAppContext();

  const handleDelete = (product: any) => {
    products.deleteItem(product);
  };

  const handleAddProduct = (product : any) => {
    products.addItemToCart(product);
  };

  const handleDeleteOneProduct = (product: any) => {
    products.deletePerItem(product);
  };

  return(
    <div>
      {products.items?.map((p) => (
        <div key={p.id} className={styles.container}>
          <div>
            <Image
              src={p.image}
              alt={p.title}
              width={200}
              height={150}
              className={styles.payImg}
            />
          </div>
          <div>
            <h5 className={styles.title}> {p.title}</h5>
            <h4>US${p.price}</h4>
            {p.qty === 0 ? "" : <div><h5>Units: {p.qty}</h5></div>}
            {p.qty === 0 ? "" : <div><h4>Subtotal: US${p.qty * p.price}</h4></div>}
            <button className="btn btn-danger" onClick={() =>handleDelete(p.id)}><FaTrash/></button>
            <button onClick={() => handleAddProduct(p)}>+</button>
            <button onClick={() => handleDeleteOneProduct(p.id)}>-</button>
          </div>
        </div>
      ))}  
    </div>
  );
};