import styles from "../styles/adminOrders.module.css";
import { findSaleDetails, updateSale } from "services/saleEndPoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { updateUser, findUniqueUser } from "services/userEndPoints";

export default function AdminOrderDetails({ id }: any) {
  const [order, setOrder] = useState<any>({});
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    try {
      (async () => {
        id ? setOrder(await findSaleDetails(id)) : null;
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id, state]);

  return (
    <div>
      <div className={styles.orderDetail}>
        <h5 className={styles.titles}>Order Detail</h5>
        {id ? (
          <div className={styles.detail}>
            <h5>Order ID: {order.id}</h5>
            <h5>User: {order.userId}</h5>
            <h5>Date: {order.date?.substring(0, 10)}</h5>
            <h5>Sale total: $ {order.total}.00 USD</h5>

            <div>
              {order.saleDetails?.map((p: any) => (
                <h6 key={p.id}>
                  Product Id:{p.idProduct}, Qty:{p.amount}, Price: ${p.price}.00
                  USD,
                  <br />
                  Subtotal ${p.amount * p.price}.00 USD
                </h6>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.detail}>
            <h4 className={styles.select}>Select an order from the list </h4>
          </div>
        )}
      </div>
    </div>
  );
}
