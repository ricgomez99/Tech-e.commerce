import styles from "../styles/ordersAdmin.module.css";
import { findManySales, findSaleDetails } from "services/saleEndPoints";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./adminOrderDetails";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [saleId, setSaleId] = useState(1);

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
      <h3>Orders</h3>
      <div className={styles.ordersContainer}>
        <div className={styles.orderDetail}>
          <AdminOrderDetails id={saleId} />
        </div>
        <div className={styles.all}>
          <ul>
            {orders?.map((o: any) => (
              <li key={o.id}>
                ID: {o.id}, User: {o.userId}, Date: {o.date}, Status: {o.state}
                <button onClick={() => setSaleId(o.id)}>Details</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
