import styles from "../styles/productsAdmin.module.css";

export default function AdminProducts() {
  return(
    <div className={styles.title}>
      <h3>Products</h3>
      <div className={styles.productsContainer}>
        <div className={styles.productDetail}>
          <h5>Product Detail</h5>
          <div className={styles.detail}>
            detalle de producto
          </div>
        </div>
        <div className={styles.all}>
          todos los productos
        </div>
      </div>
    </div>
  );
};