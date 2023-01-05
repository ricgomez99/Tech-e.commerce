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
import Loading from "components/loading";
import NotFound from "components/notFound";

export default function AdminTools() {
  const router = useRouter();
  const [tool, setTool] = useState("users");
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    try {
      (async () => {
        if (typeof email === "string") {
          let data = await findUniqueUser(email);
          setRole(data.role);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  if(role !== "ADMIN" && role !== "MOD" && role != undefined){
    return (
      <NotFound
      title="You are not allowed to be here " />
    )
  }

  return (
    <Layout>
      <div>
        <div>
          <MdOutlineArrowBack
            onClick={() => router.push("/store")}
            className={styles.backBtn}
          />
        </div>
        <div className="d-flex justify-content-evenly">
          <button
            className={`btn btn-outline-secondary ${styles.active} `}
            onClick={() => setTool("users")}
          >
            Users
          </button>
          <button
            className={`btn btn-outline-secondary ${styles.active} `}
            onClick={() => setTool("orders")}
          >
            Orders
          </button>
          <button
            className={`btn btn-outline-secondary ${styles.active} `}
            onClick={() => setTool("products")}
          >
            Products
          </button>
        </div>
        <div>
          {tool === "users" ? (
            <AdminUsers />
          ) : tool === "orders" && role === "ADMIN" ? (
            <AdminOrders />
          ) : tool === "products" && role === "ADMIN" ? (
            <AdminProducts />
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
