import { userSales } from "services/userEndPoints";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div>
    <ul>
      {orders
        ? orders.map((o) => (
            <li key={o.id}>
              Total money spent: ${o.total}.00 USD
            </li>
          ))
        : null}
    </ul>
        <Link href="/purchasedetails">More details</Link>
    </div>
  );
}