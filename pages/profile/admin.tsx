import Layout from "./../../components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminOrders from "components/adminOrders";
import AdminProducts from "components/adminProducts";
import AdminUsers from "components/adminUsers";
import { MdOutlineArrowBack } from "react-icons/md";
import styles from "../../styles/admin.module.css";

export default function AdminTools() {
  
  const router = useRouter();

  const [tool, setTool] = useState("users");

  return (
    <Layout>
      <div>
        <div>
          <MdOutlineArrowBack
            onClick={() => router.push("/store")}
            className={styles.backBtn}
          />
        </div>
        <div className="d-flex justify-content-evenly mt-3">
          <button onClick={() => setTool("users")}>Users</button>

          <button onClick={() => setTool("orders")}>Orders</button>

          <button onClick={() => setTool("products")}>Products</button>
        </div>
        <div>
          {tool === "users" ? (
            <AdminUsers />
          ) : tool === "orders" ? (
            <AdminOrders />
          ) : tool === "products" ? (
            <AdminProducts />
          ) : (
            <div>404 Not Found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};
