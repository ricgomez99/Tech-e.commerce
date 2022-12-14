import styles from "../styles/adminOrders.module.css";
import { findManySales, findSaleDetails } from "services/saleEndPoints";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./adminOrderDetails";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [saleId, setSaleId] = useState();

  useEffect(() => {
    try {
      (async () => {
        setOrders(await findManySales());
      })();
    } catch (error) {
      console.log(error);
    }
  }, [saleId]);

  return (
    <div className={styles.title}>
      <h3 className={styles.titles}>Orders</h3>
      <div className={styles.ordersContainer}>
        <div>
          <AdminOrderDetails id={saleId} />
        </div>
        <div className={styles.all}>
          {orders?.map((o: any) => (
            <div key={o.id} className={styles.orders}>
              <h5
                className={styles.name}
                onClick={() => setSaleId(o.id)}
                style={{ cursor: "pointer" }}
              >
                Order ID: {o.id}
                </h5>
                <h6 className={styles.data}>
                Date: {o.date.substring(0, 10)}
                <br /> User Id: {o.userId}
                </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
