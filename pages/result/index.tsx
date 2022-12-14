import Layout from "components/layout";
import useSWR from "swr";
import styles from "../../styles/result.module.css";
import { useRouter } from "next/router";
import { findUniqueUser } from "services/userEndPoints";
import { useAppContext } from "components/statewrapper";
import { useEffect, useState } from "react";
import { updateStock } from "services/productEndPoints";
import Link from "next/link";
import { postSale } from "services/saleEndPoints";
import { createDetailSale } from "services/DetailSaleendPoints";
import { useSession } from "next-auth/react";

async function sale(cart: any, user: any) {
  let itemsArr: any;

  if (cart) {
    itemsArr = Array.from(cart.values());
  }

  let sum = 0;
  if (itemsArr && itemsArr.length) {
    if (typeof user === "string") {
      itemsArr.map((el: any) => {
        sum += el.price * el.qty;
      });
    }
  }

  if (sum > 0) {
    const created = await postSale({
      total: sum,
      date: new Date().toISOString(),
      userId: user,
      state: "SUCCESSFUL",
    });
    saleDetail(itemsArr, created.id);
  }
}

async function saleDetail(itemsArr: any, idSale: any) {
  itemsArr.map(async (product: any) => {
    const stocked = product.stock - product.qty;
    await updateStock(product.id, stocked);
    await createDetailSale({
      amount: product.qty,
      price: product.price,
      idProduct: product.id,
      saleId: idSale,
    });
  });
}

export default function Result() {
  const router = useRouter();
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [cart, setCart]: any = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const products = useAppContext();

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        const res = await findUniqueUser(email);
        setRole(res.role);
        setUser(res.id);
        setCart(products.getCart());
      }
    })();
  }, [email]);

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    (async () => {
      await sale(cart, user);
    })();
  }, [cart]);

  if (role) {
    return (
      <Layout>
        <div className={styles.container}>
          {data ? (
            <div className={styles.text}>
              <h1 className="text-center">Thank you for your purchase!</h1>
              <h2 className={`${styles.description} text-center fs-2`}>
                Your order was completed successfully.{" "}
              </h2>

              <h3
                className={`${styles.description} text-center fs-3 text-break`}
              >
                An email with the details of your order will be sent to your
                email address shortly.
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
  } else {
    return (
      <Layout>
        <h1>Not Found</h1>
      </Layout>
    );
  }
}
