import styles from "../styles/usersAdmin.module.css";
import { findManyUsers, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";

export default function AdminUserDetails({ id }: any) {
  const [user, setUser] = useState<any>({});

  console.log(user);

  useEffect(() => {
    try {
      (async () => {
        setUser(await findUniqueUser(id));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div className={styles.usersContainer}>
      <div className={styles.userDetail}>
        <h5>User Detail</h5>
        {user ? (
          <div className={styles.detail}>
            <h3>ID: {user.id}</h3>
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Role: {user.role}</h3>
            <h3>Active: {user.active.toString()}</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
}
