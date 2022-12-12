import styles from "../styles/usersAdmin.module.css";
import { updateUser, findUniqueUser } from "services/userEndPoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserOrdersList from "./userOrdersList";

export default function AdminUserDetails({ email }: any) {
  const [user, setUser] = useState<any>({});
  const [state, setState] = useState<boolean>(true);

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
    switch (e.target.value) {
      case "ban":
        await banAlert();
        break;

      case "role":
        await upgradeAlert();
        break;

      default:
        break;
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

  async function upgradeAlert() {
    Swal.fire({
      title:
        user.role === "ADMIN"
          ? "Are you sure you want this user to lose Admin status?"
          : "Are you sure you want this user to become an Admin?",
      text: "This action can be reverted at any time",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (user.role === "ADMIN") {
          await upgradeUser();
          Swal.fire("User is no longer an ADMIN", "", "success");
        } else {
          await upgradeUser();
          Swal.fire("User is now an Admin", "", "success");
        }
      }
    });
  }

  async function upgradeUser() {
    switch (user.role) {
      case "ADMIN":
        await updateUser({ role: "USER" }, user.id);
        setState(!state);
        break;

      case "USER":
        await updateUser({ role: "ADMIN" }, user.id);
        setState(!state);
        break;

      default:
        break;
    }
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productDetail}>
        <h5>User Detail</h5>
        {user ? (
          <div className={styles.detail}>
            <h3>ID: {user.id}</h3>
            <h3>Username: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Role: {user.role}</h3>
            <button value="role" onClick={(e) => handleClick(e)}>
              {user.role === "ADMIN" ? "Set as User" : "Upgrade to Admin"}
            </button>
            <h3>Active: {user.active?.toString()}</h3>
            <button value="ban" onClick={(e) => handleClick(e)}>
              {user.active ? "Ban User" : "Unban User"}
            </button>
            <div>
              User&apos;s orders
              <div className={styles.all}>
                <UserOrdersList id={user.id} />
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
