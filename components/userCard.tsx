import styles from "../styles/user.module.css";
import UserDetails from "./userDetails";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import UserOrdersList from "./userOrdersList";

export default function UserCard() {
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    try {
      (async () => {
        if (typeof email === "string") {
          let data = await findUniqueUser(email);
          setUser(data);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  return (
    <div>
    <div className={styles.general}>
      <div className={styles.mainTitle}></div>
      <div className={styles.detailsCard}>
        <UserDetails />
      </div>
      <div className={styles.purchaseOrders}>
      <div className={styles.divider}>
        <h1>Order history</h1>
      </div>  
        <UserOrdersList id={user.id} />
      </div>
    </div>
    </div>
  );
}
