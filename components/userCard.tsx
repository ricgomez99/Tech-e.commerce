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
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setUser(data);
        console.log(data);
      }
    })();
  }, [email]);

  return (
    <div className={styles.general}>
      <div className={styles.mainTitle}></div>
      <div className={styles.detailsCard}>
        {/* <Image src={userProfile} alt="img" width={200} height={200}>
      </Image> */}
        <UserDetails />
      </div>
      <div className={styles.purchaseOrders}>
        <UserOrdersList id={user.id} />
      </div>
    </div>
  );
}
