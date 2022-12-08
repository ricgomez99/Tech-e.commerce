import styles from "../styles/usersAdmin.module.css";
import { findManyUsers, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";
import AdminUserDetails from "./adminUserDetails";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [uID, setUID] = useState(1);

  useEffect(() => {
    try {
      (async () => {
        setUsers(await findManyUsers());
      })();
    } catch (error) {
      console.log(error);
    }
  }, [uID]);

  return (
    <div className={styles.title}>
      <h3>Users</h3>
      <div className={styles.usersContainer}>
        <div className={styles.userDetail}>
          <AdminUserDetails id={uID} />
        </div>
        <div className={styles.all}>
          <ul>
            {users?.map((u: any) => (
              <li key={u.id}>
                {u.id}, {u.email}, {u.username}, {u.role}
                <button onClick={() => setUID(u.id)}>Details</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
