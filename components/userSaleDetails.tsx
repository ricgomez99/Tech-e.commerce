import { useEffect, useState } from "react";
import { idProduct } from "services/productEndPoints";
import styles from "styles/orderDetails.module.css"
import Image from "next/image";

export default function UserSaleDetails({ id }: any) {
  const[product, setProduct] = useState<any[]>([]);
  const [show, setShow] = useState(false)
    
  useEffect(() => {
    if(product){
      (async () => {
        setProduct(await idProduct(id))  
      })()
    }
  },[]);

  function handleClick () {
    setShow(!show)
  }
 
return (
  <div>
    <h6 onClick={() => handleClick()}>View more details</h6>
    {show?
    <>
    <div className={styles.itemTitle}>
        <h5>{product[0]?.title}</h5>
    </div>
    {product?<Image src={product[0]?.image} alt="img" width={110} height={90}/> : null} 
    </>
    : null
    }
  </div>
)
}