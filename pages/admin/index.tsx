import Layout from "../../components/layout";
import AdminOrders from "components/adminOrders";
import AdminProducts from "components/adminProducts";
import AdminUsers from "components/adminUsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import { MdOutlineArrowBack } from "react-icons/md";
import styles from "../../styles/admin.module.css";

export default function AdminTools() {
  
  const router = useRouter();
  const [tool, setTool] = useState("users");
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setRole(data.role);
      }
    })();
  }, [email]);

  if (role) {
    if (role === "ADMIN" || role === "MOD") {
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
    } else {
      return (
        <Layout>
          <h1>Not Found</h1>
        </Layout>
      );
    }
  } else {
    return (
      <Layout>
        <h1>Not Found</h1>
      </Layout>
    );
  }
}

