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

export default function Result() {
  const router = useRouter();
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [cart, setCart]: any = useState();
  const [itemsArr, setItemsArr]: any = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [created, setCreated]: any = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const products = useAppContext();

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setRole(data.role);
        setUser(data.id);
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
    setCart(products.getCart());
    console.log(cart);
  }, [products]);

  useEffect(() => {
    cart ? setItemsArr(Array.from(cart.values())) : null;
    console.log(itemsArr);
  }, [cart]);

  useEffect(() => {
    let sum = 0;
    if (itemsArr.length) {
      if (typeof user === "string") {
        console.log("algo", itemsArr);
        itemsArr.map((el: any) => {
          sum += el.price * el.qty;
          console.log(sum);
        });
      }
    }
    console.log(sum);
    setTotalPrice(sum);
  }, [itemsArr]);

  if (itemsArr.length) {
    useEffect(() => {
      (async () => {
        setCreated(
          await postSale({
            total: totalPrice,
            date: new Date().toISOString(),
            userId: user,
            state: "SUCCESSFUL",
          })
        );
        console.log(created);
      })();
    }, [totalPrice]);

    useEffect(() => {
      if (created) {
        itemsArr.map(async (product: any) => {
          const stocked = product.stock - product.qty;
          await updateStock(product.id, stocked);
          await createDetailSale({
            amount: product.qty,
            price: product.price,
            idProduct: product.id,
            saleId: created.id,
          });
        });
      }
    }, [created]);
  }

  // useEffect(() => {
  //   cart = products.getCart();
  //   cart ? setItemsArr(Array.from(cart.values())) : null;
  //   let quant = 0;
  //   if (typeof user === "string") {
  //     itemsArr?.length &&
  //       itemsArr?.map((product) => {
  //         // totalPrice += (Number(product.price) * Number(product.qty));
  //         setTotalPrice(totalprice + (Number(product.price) * Number(product.qty)));
  //         quant += 1;
  //       });
  //   }
  //   let saleInfo;
  //   if (quant === itemsArr.length) {
  //     console.log("palíndromo", totalPrice);
  //     saleInfo = {
  //       total: totalPrice,
  //       date: new Date().toISOString(),
  //       userId: user,
  //       state: "SUCCESSFUL",
  //     };
  //   }
  //   // setPrueba({ ...saleInfo });
  //   let created: any;
  //   if (saleInfo && saleInfo.userId) {
  //     (async () => {
  //       created = await postSale(saleInfo);
  //       console.log("nene", created);
  //     })();
  //   }
  //   if (!!created === true) {
  //     itemsArr.map(async (product) => {
  //       const stocked = product.stock - product.qty;
  //       await updateStock(product.id, stocked);
  //       await createDetailSale({
  //         amount: product.qty,
  //         price: product.price,
  //         idProduct: product.id,
  //         saleId: created.id,
  //       });
  //     });
  //   }
  //   // products.resetCart();
  // }, []);

  if (role) {
    return (
      <Layout>
        <button onClick={() => console.log(itemsArr, totalPrice)}>asdf</button>
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
