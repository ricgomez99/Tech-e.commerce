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
            <li>
              ID: {o.id}, Date: {o.date}, Total: ${o.total}.00 USD, Payment:{" "}
              {o.state}{" "}
            </li>
          ))
        : null}
    </ul>
  );
}
