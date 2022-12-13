import UserCard from "components/userCard";
import Layout from "components/layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import UserOrderHistory from "../../../components/userSaleDetails";
import UserOrdersList from "components/userOrdersList";

export default function Profile() {
  const [orders, setOrders] = useState<any[]>();
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setUser(data);
        console.log(data);
      }
    })();
  }, [email]);

  return (
    <Layout>
      <div>
        <UserCard />
      </div>
    </Layout>
  );
}
