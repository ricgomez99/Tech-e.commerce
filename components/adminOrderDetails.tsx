import styles from "../styles/ordersAdmin.module.css";
import { findSaleDetails } from "services/saleEndPoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { updateUser, findUniqueUser } from "services/userEndPoints";

export default function AdminOrderDetails({ id }: any) {
  const [order, setOrder] = useState<any>({});
  const [state, setState] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    try {
      (async () => {
        setOrder(await findSaleDetails(id));
      })();
      (async () => {
        setUser(await findUniqueUser(order.userId));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id, state]);

  async function handleClick(e: any) {
    switch (e.target.value) {
      case "success":
        // await banAlert();
        break;
      case "pending":
        // await banAlert();
        break;
      case "failure":
        // await banAlert();
        break;
      default:
        break;
    }
  }

  // async function statusAlert() {
  //   Swal.fire({
  //     title: order.state === 'PENDING'
  //       ? "Are you sure you want to ban this user?"
  //       : "Are you sure you want to unban this user?",
  //     text: "This action can be reverted at any time",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //     reverseButtons: true,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       if (order.active) {
  //         Swal.fire("User has now been banned", "", "success");
  //         banUser();
  //       } else if (!order.active) {
  //         Swal.fire("User has now been unbanned", "", "success");
  //         banUser();
  //       }
  //     }
  //   });
  // }

  // async function banUser() {
  //   switch (order.active) {
  //     case true:
  //       // await updateUser({ active: false }, user.id);
  //       state(!state);
  //       break;

  //     case false:
  //       // await updateUser({ active: true }, user.id);
  //       state(!state);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productDetail}>
        <h5>User Detail</h5>
        {order ? (
          <div className={styles.detail}>
            <h3>Order ID: {order.id}</h3>
            <h3>
              User: {order.userId + " "} {user ? user.username : null}
            </h3>
            <h3>Date: {order.date}</h3>
            <h3>Sale total: $ {order.total}.00 USD</h3>

            <div>
              <ul>
                {order.saleDetails?.map((p: any) => (
                  <li key={p.id}>
                    {p.id}, {p.amount}, {p.price}, {p.idProduct}
                  </li>
                ))}
              </ul>
            </div>

            <h3>Status: {order.state}</h3>
            {order.state === "SUCCESS" ? null : (
              <button value="success" onClick={(e) => handleClick(e)}>
                Mark as completed
              </button>
            )}
            {order.state === "PENDING" ? null : (
              <button value="pending" onClick={(e) => handleClick(e)}>
                Mark as pending
              </button>
            )}
            {order.state === "FAILURE" ? null : (
              <button value="failure" onClick={(e) => handleClick(e)}>
                Mark as failed
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
