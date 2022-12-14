import { useEffect, useState } from "react";
import { idProduct } from "services/productEndPoints";
import styles from "styles/orderDetails.module.css"
import { findSaleDetails } from "services/saleEndPoints";
import OrderDetails from "./orderDetails";

export default function UserSaleDetails({ id }: any) {
  const[product, setProduct] = useState<any[]>([]);
  const [show, setShow] = useState(false)
  const[sale, setSale] = useState<any>();
    
  useEffect(() => {
    if(product){
      (async () => {
        setProduct(await idProduct(id)) 
        setSale(await findSaleDetails(id)) 
      })()
    }
  },[]);

  function handleClick () {
    setShow(!show);
  }

return (
  <div>
    <h6 onClick={() => handleClick()}>View more details</h6>
    {show?
    <div className={styles.viewDetails}>
        {sale?.saleDetails?.map((e: any) => (
          <div key={e.idProduct}>
            <div className={styles.saleMap}>
            <OrderDetails id={e.idProduct}/>
            <h6>Quantity: {e.amount}</h6>
            <h6>Item price: {e.price}</h6>
            </div>
          </div>
        ))}
      </div>
      : null
    }

  </div>
)
}

