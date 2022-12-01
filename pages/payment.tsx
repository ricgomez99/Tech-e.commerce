import Layout from "components/layout";
import Footer from "components/footer";
// import CardPayment from "components/cardPayment";
import Router from "next/router";
import React from "react"; //useContext
import styles from "../styles/payment.module.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function Payment() {


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
                <button onClick={() => Router.back()}>Back</button>
                <div className={styles.containerInfo}>
                    <div>
                        Productos
                        {/* <CardPayment /> */}
                    </div>

                    <div>
                        <h5>Total price: US${ }</h5>
                        <button role="link" onClick={handleClick}>Pay</button>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};