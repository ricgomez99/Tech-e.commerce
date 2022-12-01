import Layout from "components/layout";
import Footer from "components/footer";
import CardPayment from "components/cardPayment";
import Router from "next/router";
import React from "react";
import styles from "../styles/payment.module.css";
import { useAppContext } from "components/statewrapper";
import { MdOutlineArrowBack } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function Payment() {

  const products = useAppContext().items;

  const getTotal = () => {
    const total = products.reduce((acc, item) => acc + item.qty * item.price, 0);
    return total;
  }
  const handleClick = async (event: any) => {
    const { sessionId } = await fetch('http://localhost:3000/api/checkout_sessions', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ quantity: 1 })
    }).then(res => res.json());
    const stripe = await stripePromise;
    const { error }: any = await stripe?.redirectToCheckout({
      sessionId,
    });
  };


  return (
    <Layout>
      <div className={styles.containerPayment}>
        <button onClick={() => Router.back()} className="btn btn-secondary">
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
            <h3 className={styles.totalPrice}>Total price: US${getTotal()}</h3>
            <button style={{ cursor: "pointer", width: "250px", height: "50px" }} className="btn btn-success" role="link" onClick={handleClick} >
              Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};