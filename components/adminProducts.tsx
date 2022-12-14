import styles from "../styles/adminProducts.module.css";
import { useEffect, useState } from "react";
import { getProducts2 } from "../services/productEndPoints";
import Image from "next/image";
import SearchBar from "./searchbar";
import Product from "./product";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [conditions, setConditions] = useState({});
  const [chosenProduct, setChosenProduct] = useState({});
  const router = useRouter();

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

  return (
    <div className={styles.title}>
      <h3 className={styles.titles}>Products</h3>
      <div className={styles.productsContainer}>
        <div className={styles.productDetail}>
          <h5 className={styles.titles}>Product Detail</h5>
          <div className={styles.detail}>
            {Object.keys(chosenProduct).length ? (
              <Product
                product={chosenProduct}
                qty={undefined}
                showAs="adminProduct"
              />
            ) : (
              <h4 className={styles.select}>Select a product from the list</h4>
            )}
          </div>
        </div>
        <div className={styles.allProducts}>
          <div className={styles.search}>
            <SearchBar handleConditions={handleConditions} />
            <div className={styles.toolsBtn}>
              <button
                className={styles.refresh}
                onClick={() => setConditions({})}
              >
                Refresh
              </button>
              <button
                className={styles.addToCart}
                onClick={() => router.push("/newProduct")}
              >
                Add Product
                <BsFillPlusCircleFill className={styles.icon} />
              </button>
            </div>
          </div>
          <div className={styles.all}>
            {products.length ? (
              products.map((p) => (
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
                  <h5
                    className={styles.name}
                    onClick={() => {
                      handleProduct(p);
                    }}
                  >
                    {p.title}
                  </h5>
                </div>
              ))
            ) : (
              <h3>Loading Products...</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
