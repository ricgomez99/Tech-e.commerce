import React, { ReactNode } from "react";
import Head from "next/head";
import NavBar from "./navbar";
import ShoppingCart from "./shoppingcart"

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function Layout({ title, children }: Props) {
  return (
    <div>
      <Head>
        <title>E-commerce{title ? `| ${title}` : ""}</title>
      </Head>
      <NavBar />
      <div>{children}</div>
      <ShoppingCart />
    </div>
  );
}
