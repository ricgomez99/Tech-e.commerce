import styles from "../styles/ordersAdmin.module.css";
import { findSaleDetails, updateSale } from "services/saleEndPoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { updateUser, findUniqueUser } from "services/userEndPoints";

export default function AdminOrderDetails({ id }: any) {
  const [order, setOrder] = useState<any>({});
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    try {
      (async () => {
        setOrder(await findSaleDetails(id));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id, state]);

  async function handleClick(e: any) {
    switch (e.target.value) {
      case "success":
        await statusAlert("success");
        break;
      case "pending":
        await statusAlert("pending");
        break;
      case "failure":
        await statusAlert("pending");
        break;
      default:
        break;
    }
  }

  async function statusAlert(status: string) {
    Swal.fire({
      title:
        status === "success"
          ? "Set this sale's payment as SUCCESS?"
          : status === "pending"
          ? "Set this sale's payment as PENDING?"
          : "Set this sale's payment as FAILURE?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (status === "success") {
          Swal.fire("Sale payment was successful!", "", "success");
          orderStatus(status);
        } else if (status === "pending") {
          Swal.fire("Sale payment is pending confirmation", "", "success");
          orderStatus(status);
        } else {
          Swal.fire("Sale payment has failed", "", "success");
          orderStatus(status);
        }
      }
    });
  }

  async function orderStatus(status: string) {
    switch (status) {
      case "success":
        await updateSale({ state: "SUCCESS" }, order.id);
        setState(!state);
        break;

      case "pending":
        await updateSale({ state: "PENDING" }, order.id);
        setState(!state);
        break;

      case "failure":
        await updateSale({ state: "FAILURE" }, order.id);
        setState(!state);
        break;

      default:
        break;
    }
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productDetail}>
        <h5>Order Detail</h5>
        {order ? (
          <div className={styles.detail}>
            <h3>Order ID: {order.id}</h3>
            <h3>User: {order.userId}</h3>
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
        ) : (
          <div className={styles.detail}>
            <h3>Select an order from the list </h3>
          </div>
        )}
      </div>
    </div>
  );
}
