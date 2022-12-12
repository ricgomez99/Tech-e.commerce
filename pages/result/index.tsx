import Layout from "components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import styles from "../../styles/result.module.css";
import Image from "next/image";
import { useAppContext } from "components/statewrapper";
import { useEffect, useState } from "react";
import { updateStock } from "services/productEndPoints";
import Link from "next/link";

export default function Result() {
  const router = useRouter();

  let cart;

  const products = useAppContext();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  let itemsArr: any[] = [];

  useEffect(() => {
    cart = products.getCart();
    cart ? (itemsArr = Array.from(cart.values())) : null;
    itemsArr.map(async (product) => {
      const stocked = product.stock - product.qty;
      const stock = stocked.toString();
      await updateStock(product.id, stocked);
    });
    products.resetCart();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {data ? (
          <div className={styles.text}>
            <h1 className="text-center">Thank you for your purchase!</h1>

            <h2 className={`${styles.description} text-center fs-2`}>
              Your order was completed successfully.{" "}
            </h2>

            <h3 className={`${styles.description} text-center fs-3 text-break`}>
              An email with the details of your order will be sent to your email
              address shortly.
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
}
