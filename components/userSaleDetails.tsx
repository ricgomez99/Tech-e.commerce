import { useEffect, useState } from "react";
import { idProduct } from "services/productEndPoints";
import styles from "styles/orderDetails.module.css";
import { findSaleDetails } from "services/saleEndPoints";
import OrderDetails from "./orderDetails";

export default function UserSaleDetails({ id }: any) {
  const [product, setProduct] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [sale, setSale] = useState<any>();
  const [message, setMessage] = useState(false);

  useEffect(() => {
    try {
      if (product) {
        (async () => {
          setProduct(await idProduct(id));
          setSale(await findSaleDetails(id));
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleClick() {
    setMessage(!message)
    setShow(!show);
  }

return (
  <div>
    <div className={styles.detailsContainer}>
    <button className={styles.buttonInfo} onClick={() => handleClick()}>{message ? "Show less" : "View details"}</button>
    {show?
    <div className={styles.viewDetails}>
        {sale?.saleDetails?.map((e: any) => (
          <div className={styles.details} key={e.idProduct}>
            <div className={styles.saleMap}>
            <OrderDetails id={e.idProduct}/>
            <div className={styles.pandq}>
            <h6 className={styles.quantity}>Quantity: {e.amount}</h6>
            <h6 className={styles.price}>Item price: ${e.price}</h6>
            </div>
            </div>
        </div>
          ))}
   </div>
  : null}
  </div>
 </div>
  );
}
