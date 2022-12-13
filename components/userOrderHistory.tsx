import { userSales } from "services/userEndPoints";
import { useEffect, useState } from "react";
import OrderDetails from "./orderDetails";
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
      {/* {orders
        ? orders.map((o) => 
        {
          return (
            <div>
            <div style={{"border": "1px solid black"}}>
            <h6>ID de la orden: {o.id}</h6>
            <h5>Date: {o.date.slice(0,10)}</h5>
            <h4>Total de la orden: ${o.total}.00 USD</h4>
            </div>
            </div>
            )
          }
          )
        : null} */}
        <div>
          <Link href="/salesdetails" >View details</Link>
        </div>
    </div>
  );
}