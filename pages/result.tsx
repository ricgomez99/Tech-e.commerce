import Layout from "components/layout";
import Footer from "components/footer";
import { useRouter } from "next/router";
import useSWR from "swr";

import styles from "../styles/result.module.css";
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

  data ? console.log(data.session.payment_intent.status) : null;

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

  console.log("products", products.items);

  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        <div>
          {data ? (
            <div>
              <h1 className="text-center">Thank you for your purchase!</h1>

              <h2 className="text-center">
                Your order was completed successfully.{" "}
              </h2>

              <h3 className="text-center text-break">
                An email with the details of your order will be sent to your
                email address shortly.
                <br />
                Your order ID is: {data.session.id}
              </h3>

              <h3>
                To continue shopping click{" "}
                <Link href="/store" style={{ textDecoration: "none" }}>
                  here.
                </Link>
              </h3>
            </div>
          ) : null}
          {/* Instead of Null here should go a 404 page */}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
