import Layout from "components/layout";
import Footer from "components/footer";
// import CardPayment from "components/cardPayment";
import Router from "next/router";
import React from "react"; //useContext
import styles from "../styles/payment.module.css";

export default function Payment() {




    return(
        <Layout>
            <div className={styles.containerPayment}>
                <button onClick={() => Router.back()}>Back</button>
                <div className={styles.containerInfo}>
                    <div>
                        Productos
                        {/* <CardPayment /> */}
                    </div>

                    <div>
                        <h5>Total price: US${}</h5>
                        <button>Pay</button>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};