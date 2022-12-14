import styles from "../styles/adminUsers.module.css";
import { updateUser, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserOrdersList from "./userOrdersList";
import { useSession } from "next-auth/react";

export default function AdminUserDetails({ email }: any) {
  const [user, setUser] = useState<any>({});
  const [state, setState] = useState<boolean>(true);
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const currentEmail = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof currentEmail === "string") {
        let data = await findUniqueUser(currentEmail);
        setRole(data.role);
      }
    })();
  }, [currentEmail]);

  useEffect(() => {
    try {
      (async () => {
        setUser(await findUniqueUser(email));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [email, state]);

  async function handleClick(e: any) {
    let role = e.target.value;

    if (e.target.value === "ban") {
      await banAlert();
    } else {
      await upgradeAlert(role);
    }
  }

  async function banAlert() {
    Swal.fire({
      title: user.active
        ? "Are you sure you want to ban this user?"
        : "Are you sure you want to unban this user?",
      text: "This action can be reverted at any time",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (user.active) {
          Swal.fire("User has now been banned", "", "success");
          banUser();
        } else if (!user.active) {
          Swal.fire("User has now been unbanned", "", "success");
          banUser();
        }
      }
    });
  }

  async function banUser() {
    switch (user.active) {
      case true:
        await updateUser({ active: false }, user.id);
        setState(!state);
        break;

      case false:
        await updateUser({ active: true }, user.id);
        setState(!state);
        break;

      default:
        break;
    }
  }

  async function upgradeAlert(role: string) {
    Swal.fire({
      title:
        role === "user"
          ? "Are you sure you want this user to lose it's status?"
          : role === "mod"
          ? "Are you sure you want this user to become a Mod?"
          : "Are you sure you want this user to become aa Admin?",
      text: "This action can be reverted at any time",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (role === "user") {
          await upgradeUser(role);
          Swal.fire("User is no longer a MOD/ADMIN", "", "success");
        } else if (role === "mod") {
          await upgradeUser(role);
          Swal.fire("User is now a Mod", "", "success");
        } else {
          await upgradeUser(role);
          Swal.fire("User is now an Admin", "", "success");
        }
      }
    });
  }

  async function upgradeUser(role: string) {
    switch (role) {
      case "user":
        await updateUser({ role: "USER" }, user.id);
        setState(!state);
        break;

      case "mod":
        await updateUser({ role: "MOD" }, user.id);
        setState(!state);
        break;

      case "admin":
        await updateUser({ role: "ADMIN" }, user.id);
        setState(!state);
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.usersContainer}>
      <div className={styles.userDetail}>
        <h5>User Detail</h5>
        {email.length ? (
          <div className={styles.detail}>
            <h3>ID: {user?.id}</h3>
            <h3>Username: {user?.name}</h3>
            <h3>Email: {user?.email}</h3>
            <div className={styles.click}>
              <h3>Role: {user?.role}</h3>
              {user?.role === "USER" ? null : (
                <button
                  value="user"
                  onClick={(e) => handleClick(e)}
                  disabled={role ? (role === "ADMIN" ? false : true) : false}
                >
                  Set as User
                </button>
              )}
              {user?.role === "MOD" ? null : (
                <button
                  value="mod"
                  onClick={(e) => handleClick(e)}
                  disabled={role ? (role === "ADMIN" ? false : true) : false}
                >
                  {user?.role === "ADMIN" ? "Set as Mod" : "Upgrade to Mod"}
                </button>
              )}
              {user?.role === "ADMIN" ? null : (
                <button
                  value="admin"
                  onClick={(e) => handleClick(e)}
                  disabled={role ? (role === "ADMIN" ? false : true) : false}
                >
                  Upgrade to Admin
                </button>
              )}
            </div>
            <div className={styles.click}>
              <h3>Status: {user?.active ? "Active" : "Banned"}</h3>
              <button value="ban" onClick={(e) => handleClick(e)}>
                {user?.active ? "Ban User" : "Unban User"}
              </button>
            </div>
            <div>
              <h3>Orders</h3>
              <div className={styles.userOrders}>
                <UserOrdersList id={user?.id} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.detail}>
            <h3>Select a user from the list </h3>
          </div>
        )}
      </div>
    </div>
  );
}
