import Layout from "components/layout";
import Footer from "components/footer";
import CardPayment from "components/cardPayment";
import Router from "next/router";
import React from "react";
import styles from "../styles/payment.module.css";
import { useAppContext } from "components/statewrapper";
import { MdOutlineArrowBack } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "react-bootstrap/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function conversion(cart: any) {
  if (!cart.length) return;
  let array: any[] = [];
  for (let i = 0; i < cart.length; i++) {
    array.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: cart[i].title,
          images: [cart[i].image],
        },
        unit_amount: cart[i].price * 100,
      },
      quantity: cart[i].qty,
    });
  }
  return array;
}

export default function Payment() {
  const cart = useAppContext();
  const [emptyCart, setEmptyCart] = useState(true);
  const { status } = useSession();

  const getTotal = () => {
    const total = cart.items.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    return total;
  };
  const handleClick = async (event: any) => {
    const line_items = conversion(cart.items);
    const { sessionId } = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(line_items),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error }: any = await stripe?.redirectToCheckout({
      sessionId,
    });
  };

  useEffect(() => {
    cart.updateCart();
    cart.items.length ? setEmptyCart(false) : setEmptyCart(true);
  }, [cart.updateCart, cart.addItemToCart, cart.deleteItem]);

  return (
    <Layout>
      {!emptyCart ? (
        <div className={styles.containerPayment}>
          <button
            onClick={() => Router.push("/store")}
            className="btn btn-secondary"
          >
            <MdOutlineArrowBack />
          </button>
          <div className={styles.title}>
            <h2>Payment Details</h2>
          </div>
          <div className={styles.containerInfo}>
            <div className={styles.card}>
              <CardPayment />
            </div>
            <div className={styles.total}>
              <h3 className={styles.totalPrice}>
                Total price: US${getTotal()}
              </h3>
              {status !== "loading" ? (
                status === "authenticated" ? (
                  <Button
                    className={styles.button}
                    variant="primary"
                    role="link"
                    onClick={handleClick}
                  >
                    Pay
                  </Button>
                ) : (
                  <Button
                    className={styles.button}
                    variant="secondary"
                    disabled
                  >
                    Please Log in
                  </Button>
                )
              ) : (
                <Button className={styles.button} variant="secondary" disabled>
                  Authenticating...
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Empty Car</div>
      )}
      <Footer />
    </Layout>
  );
}
