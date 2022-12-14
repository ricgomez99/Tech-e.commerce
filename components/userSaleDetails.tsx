import { useEffect, useState } from "react";
import { idProduct } from "services/productEndPoints";
import styles from "styles/orderDetails.module.css";
import Image from "next/image";
import { findSaleDetails } from "services/saleEndPoints";
import OrderDetails from "./orderDetails";

export default function UserSaleDetails({ id }: any) {
  const [product, setProduct] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [sale, setSale] = useState<any>();

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
    setShow(!show);
  }

  return (
    <div>
      <h3 onClick={() => handleClick()}>View more details</h3>
      {show ? (
        <div>
          {sale?.saleDetails?.map((e: any) => (
            <div key={e.idProduct}>
              <div className={styles.saleMap}>
                <OrderDetails id={e.idProduct} />
                <h5>Quantity: {e.amount}</h5>
                <h5>Total item price: {e.price}</h5>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
