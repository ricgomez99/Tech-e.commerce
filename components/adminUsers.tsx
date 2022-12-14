import styles from "../styles/adminUsers.module.css";
import { findManyUsers, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";
import AdminUserDetails from "./adminUserDetails";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState(1);

  useEffect(() => {
    try {
      (async () => {
        setUsers(await findManyUsers());
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userEmail]);

  return (
    <div className={styles.title}>
      <h3>Users</h3>
      <div className={styles.usersContainer}>
        <div className={styles.userDetail}>
          <AdminUserDetails email={userEmail} />
        </div>
        <div className={styles.all}>
          <ul>
            {users.length ? (
              users.map((u: any) => (
                <div key={u.id} className={styles.orders}>
                  <h5
                    className={styles.name}
                    onClick={() => setUserEmail(u.email)}
                    style={{ cursor: "pointer" }}
                  >
                    {u.role}, Username: {u.name}
                    <br />
                    Email: {u.email}
                  </h5>
                </div>
              ))
            ) : (
              <li>Users are shown here</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
