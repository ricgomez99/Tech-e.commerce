import styles from "../styles/usersAdmin.module.css";
import { findManyUsers, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [uID, setUID] = useState(1);
  // console.log(users);

  type User = {
    [key: string]: any;
  };

  let detail: User = {};

  // console.log(detail);

  useEffect(() => {
    try {
      (async () => {
        setUsers(await findManyUsers());
        detail = await findUniqueUser(uID);
        // console.log(detail.id, detail.username, detail.email, detail.role);
      })();
    } catch (error) {
      console.log(error);
    }
    // console.log(users);
  }, [uID]);

  return (
    <div className={styles.title}>
      <h3>Users</h3>
      <div className={styles.usersContainer}>
        <div className={styles.userDetail}>
          <h5>User Detail</h5>
          {detail ? (
            <div className={styles.detail}>
              <h3>
                ID: {detail.id} {console.log(detail.id)}
              </h3>
              <h3>Username: {detail.username}</h3>
              <h3>Email: {detail.email}</h3>
              <h3>Role: {detail.role}</h3>
            </div>
          ) : null}
        </div>
        <div className={styles.all}>
          <ul>
            {users.map((u: any) => (
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
