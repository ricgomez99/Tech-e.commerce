import { userSales } from "services/userEndPoints";
import { useEffect, useState } from "react";
import UserSaleDetails from "./userSaleDetails";
import styles from "styles/adminOrders.module.css";
import NotFound from "./notFound";

export default function UserOrdersList({ id }: any) {
  const [orders, setOrders] = useState<any[]>();
  const [saleId, setSaleId] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        setOrders(await userSales(id));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [orders]);

  function handleClick(id: any) {
    setSaleId(id);
  }

  return (
    <ul>
      {orders?.length
        ? orders.map((o) => (
            <>
              <h6 onClick={() => handleClick(o.id)} key={o.id}>
                Sale ID: {o.id}, Date: {o.date.slice(0, 10)}, Total: ${o.total}.00
                USD
              </h6>
              <UserSaleDetails id={o.id} />
            </>
          ))
        : (
          <NotFound shortMessage="" title="There's no orders here yet" description="Go to the store and buy those products that you like the most." button={false}/>
        )}
    </ul>
  );
}
