import styles from "../styles/usersAdmin.module.css";
import { updateUser, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";

export default function AdminUserDetails({ id }: any) {
  const [user, setUser] = useState<any>({});
  const [active, setActive] = useState<boolean>(true);
  const [role, setRole] = useState<boolean>(true);

  console.log(user);

  useEffect(() => {
    try {
      (async () => {
        setUser(await findUniqueUser(id));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id, active, role]);

  function handleBan(e: any) {
    switch (e.target.value) {
      case "ban":
        if (user.active === true) {
          updateUser(user.id, { active: false });
          setActive(!active);
        } else {
          updateUser(user.id, { active: true });
          setActive(!active);
        }
        break;

      case "role":
        if (user.role === "ADMIN") {
          updateUser(user.id, { role: "USER" });
          setRole(!role);
        } else {
          updateUser(user.id, { role: "ADMIN" });
          setRole(!role);
        }

      default:
        break;
    }

    console.log(e.target.value);
  }

  function handleRole() {}

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
            <button value="role" onClick={(e) => handleBan(e)}>
              {user.role === "ADMIN" ? "Set as User" : "Upgrade to Admin"}
            </button>
            <h3>Active: {user.active?.toString()}</h3>
            <button value="ban" onClick={(e) => handleBan(e)}>
              Ban User
            </button>
            <div>
              User's orders
              <div>
                <ul>
                  <li>Orden 1</li>
                  <li>Orden 2</li>
                  <li>Orden 3</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
