import Layout from "components/layout";
import Footer from "components/footer";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "../styles/result.module.css";
import Image from "next/image";
import { useAppContext } from "components/statewrapper";
import { useEffect, useState } from "react";

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

  data ? console.log(data.session.payment_intent.status) : null;

  let itemsArr: any[] = [];

  useEffect(() => {
    console.log("items", products.items);
    cart = products.getCart();

    console.log("cart", cart);
    cart ? (itemsArr = Array.from(cart.values())) : null;
    console.log("arr", itemsArr);
    products.resetCart();
  }, []);
  // data
  //   ? data.session.payment_intent.status === "succeeded"
  //     ? products.resetCart()
  //     : null
  //   : null;

  console.log("products", products.items);

  return (
    <Layout>
      <div>
        <div>
          {data ? (
            <div>
              <h1>Thank you for your purchase!</h1>

              <h2>Your order was completed successfully. </h2>

              {/* {itemsArr.map((p) => (
                // {products?.items.map((p) => (
                <div key={p.id} className={styles.container}>
                  <div>
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={200}
                      height={150}
                      className={styles.payImg}
                    />
                  </div>
                  <div>
                    <h5 className={styles.title}> {p.title}</h5>
                    {p.qty === 0 ? (
                      ""
                    ) : (
                      <div>
                        <h5>Units: {p.qty}</h5>
                      </div>
                    )}
                  </div>
                </div>
              ))} */}
              {<h4>Total: ${data.session.amount_total / 100}</h4>}
            </div>
          ) : null}
          {/* Instead of Null here should go a 404 page */}
        </div>
        {/* <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre> */}
      </div>
      <Footer />
    </Layout>
  );
}
