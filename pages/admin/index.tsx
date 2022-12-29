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
              ) : tool === "orders"  && role === 'ADMIN' ? (
                <AdminOrders />
              ) : tool === "products" && role === 'ADMIN' ? (
                <AdminProducts />
              ) : (
                <div>
                  <NotFound 
                    shortMessage="" 
                    title="ACCESS DENIED" 
                    description="Only Admins can see this content, please contact with an Admin" 
                    button={false}
                  />
                </div>
              )}
            </div>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <NotFound shortMessage="" title="ACCESS DENIED" description="You are not allowed to access to this content, please go back to the HomePage"/>
        </Layout>
      );
    }
  } else {
    return (
      <Layout>
        <NotFound shortMessage="" title="ACCESS DENIED" description="You are not allowed to access to this content, please go back to the HomePage"/>
      </Layout>
    );
  }
}
