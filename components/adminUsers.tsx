import styles from "../styles/usersAdmin.module.css";
import { findManyUsers, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState();
  console.log(users);

  useEffect(() => {
    try {
      (async () => {
        setUsers(await findManyUsers());
      })();
    } catch (error) {
      console.log(error);
    }
    console.log(users);
  }, []);

  return (
    <div className={styles.title}>
      <h3>Users</h3>
      <div className={styles.usersContainer}>
        <div className={styles.userDetail}>
          <h5>User Detail</h5>
          <div className={styles.detail}>detalle de usuario</div>
        </div>
        <div className={styles.all}>
          <ul>
            {users.map((u: any) => (
              <li key={u.id}>
                {u.id}, {u.email}, {u.username}, {u.role}
                <button onClick={() => setUserDetail(u.id)}>Details</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
