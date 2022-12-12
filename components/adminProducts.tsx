import styles from "../styles/adminProducts.module.css";
import { useEffect, useState } from "react";
import { getProducts2 } from "../services/productEndPoints";
import Image from "next/image";
import SearchBar from "./searchbar";
import Product from "./product";

export default function AdminProducts() {

  const [products, setProducts] = useState<any[]>([]);
  const [conditions, setConditions] = useState({});
  const [chosenProduct, setChosenProduct] = useState({});

  const handleConditions = (values: any) => {
    setConditions({ ...conditions, ...values });
  };

  const handleProduct = (p: any) => {
    setChosenProduct(p);
  };

  useEffect(() => {
    try {
      (async () => {
        const allProducts = await getProducts2(conditions);
        setProducts(allProducts);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [conditions]);

  return(
    <div className={styles.title}>
      <h3>Products</h3>
      <div className={styles.productsContainer}>
        <div className={styles.productDetail}>
          <h5>Product Detail</h5>
          <div className={styles.detail}>
            {Object.keys(chosenProduct).length ?(<Product 
              product={chosenProduct} 
              qty={undefined}
              showAs="adminProduct"
              />) : ""}
          </div>
        </div>
        <div className={styles.allProducts}>
          <div className={styles.search}>
            <SearchBar handleConditions={handleConditions} />
            <button className={styles.refresh} onClick={() => setConditions({})}>
            Refresh
            </button>
          </div>
          <div className={styles.all}>
              {products?.map((p) =>(
                <div key={p.id} className={styles.products}>
                  <div>
                    <Image
                      width={100}
                      height={100}
                      src={p.image}
                      alt={p.title}
                      className={styles.productImg}
                    />
                  </div>
                  <h5 className={styles.name} onClick={() => {handleProduct(p)}}>{p.title}</h5>
                </div>  
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};