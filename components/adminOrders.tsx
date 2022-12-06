import styles from "../styles/ordersAdmin.module.css";

export default function AdminOrders() {
  return(
    <div className={styles.title}>
      <h3>Orders</h3>
      <div className={styles.ordersContainer}>
        <div className={styles.orderDetail}>
          <h5>Order Detail</h5>
          <div className={styles.detail}>
            detalle de orden
          </div>
        </div>
        <div className={styles.all}>
          todas las ordenes
        </div>
      </div>
    </div>
  );
};