import Layout from "components/layout";
import useSWR from "swr";
import styles from "../../styles/result.module.css";
import { useRouter } from "next/router";
import { findUniqueUser } from "services/userEndPoints";
import { useAppContext } from "components/statewrapper";
import { useEffect, useState } from "react";
import { updateStock } from "services/productEndPoints";
import Link from "next/link";
import { postSale, findSaleDetails } from "services/saleEndPoints";
import { createDetailSale } from "services/DetailSaleendPoints";
import { useSession } from "next-auth/react";

export default function Result() {
  const router = useRouter();
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

  let cart;

  const products = useAppContext();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  let itemsArr: any[] = [];
  let totalPrice: number;
  let user: string;
  
  useEffect(() => {
    cart = products.getCart();
    cart ? (itemsArr = Array.from(cart.values())) : null;
    itemsArr.map((product) => {
      totalPrice += (product.price * product.qty)
    })
    const data = {
      total : totalPrice,
      date : new Date().toISOString(),
      userId : ""
    }
    let created = 
    itemsArr.map(async (product) => {
      const stocked = product.stock - product.qty;
      const stock = stocked.toString();
      await updateStock(product.id, stocked);

    });
    products.resetCart();
  }, []);

  if (role) {
    return (
      <Layout>
        <div className={styles.container}>
          {data ? (
            <div className={styles.text}>
              <h1 className="text-center">Thank you for your purchase!</h1>
              <h2 className={`${styles.description} text-center fs-2`}>
                Your order was completed successfully.{" "}
              </h2>

              <h3
                className={`${styles.description} text-center fs-3 text-break`}
              >
                An email with the details of your order will be sent to your
                email address shortly.
                <br />
                {/* Your order ID is: {data.session.id} */}
              </h3>

              <h3 className={`${styles.description} text-center fs-3`}>
                To continue shopping click{" "}
                <Link href="/store" style={{ textDecoration: "none" }}>
                  here.
                </Link>
              </h3>
            </div>
          ) : null}
          {/* Instead of Null here should go a 404 page */}
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
}
