import Layout from "components/layout";
import Footer from "components/footer";
import CardPayment from "components/cardPayment";
import Router from "next/router";
import React from "react";
import styles from "../styles/payment.module.css";
import { useAppContext } from "components/statewrapper";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Payment() {

    const products = useAppContext().items;

    const getTotal = () => {
        const total = products.reduce((acc, item)=> acc+ item.qty * item.price, 0);
        return total;
    }

    return(
        <Layout>
            <div className={styles.containerPayment}>
                <button onClick={() => Router.back()} className="btn btn-outline-secondary"> <MdOutlineArrowBack/></button>
                <div className={styles.title}>
                    <h2>Payment Details</h2>
                </div>
                <div className={styles.containerInfo}>
                    <div className={styles.card}>
                        <CardPayment />
                    </div>

                    <div className={styles.total}>
                        <h3 className={styles.totalPrice}>Total price: US${getTotal()}</h3>
                        <button style={{ cursor: "pointer", width: "250px", height:"50px"}}
                            className="btn btn-success">Pay</button>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};