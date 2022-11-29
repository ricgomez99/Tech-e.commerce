import styles from "../styles/cardPayment.module.css";
import { useAppContext } from "./statewrapper";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";


export default function cardPayment() {

    const products = useAppContext();

    
    const handleDelete = (product: any) => {
      products.deleteItem(product);
    }

    return(
      <div>
        {products.items?.map((p) => (
          <div className={styles.container}>
            <div>
              <Image
                src={p.image}
                alt={p.title}
                width={200}
                height={150}
              />
            </div>
            <div className={styles.titleContainer}>
              <h5 className={styles.title}> {p.title}</h5>
              <h3 className={styles.price}>US${p.price}</h3>
              <button className="btn btn-danger" onClick={() =>handleDelete(p.id)}><FaTrash/></button>
            </div>
          </div>
        ))}
        
      </div>
    );
};