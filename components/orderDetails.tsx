import { useEffect, useState } from "react";
import Image from "next/image";
import { idProduct } from "services/productEndPoints";
import styles from "styles/orderDetails.module.css";

export default function OrderDetails({ id }: any) {
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (product) {
        (async () => {
          setProduct(await idProduct(id));
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.imageAndText}>
      <div className={styles.itemTitle}>
          <h6>{product[0]?.title}</h6>
      </div>
      <Image className={styles.detailsImage} src={product[0]?.image} alt="img" width={110} height={90} />
    </div>
  );
}
