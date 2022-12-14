import { userSales } from "services/userEndPoints";
import { useEffect, useState } from "react";

export default function UserOrdersList({ id }: any) {
  const [orders, setOrders] = useState<any[]>();

  useEffect(() => {
    try {
      (async () => {
        setOrders(await userSales(id));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [orders]);

  return (
    <ul>
      {orders
        ? orders.map((o) => (
            <h6 key={o.id}>
              ID: {o.id}, Date: {o.date.substring(0, 10)}, Total: ${o.total}.00
              USD
            </h6>
          ))
        : null}
    </ul>
  );
}
