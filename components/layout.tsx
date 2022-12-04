import React, { ReactNode } from "react";
import Head from "next/head";
import NavBar from "./navbar";
import ShoppingCart from "./shoppingcart";
import Footer from "./footer";
import styles from "../styles/layout.module.css";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <div className={styles.box}>
      <div className={styles.header + " " + styles.row}>
        <Head>
          <title>E-commerce{title ? `| ${title}` : ""}</title>
        </Head>
        <NavBar />
        <ShoppingCart />
      </div>
      <div className={styles.content + " " + styles.row}>{children}</div>
      <div className={styles.footer + " " + styles.row}>
        <Footer />
      </div>
    </div>
  );
}
