import styles from "styles/salesDetails.module.css";
import Layout from "../../components/layout";
import { getSalePathsIds } from "utils/salePaths";
import { findSaleDetails } from "services/saleEndPoints";
import OrderDetails from "components/orderDetails";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";

export default function SalesDetails({ saleInfo }: any) {

  const [user, setUser] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setUser(data);
      }
    })();
  }, [email]);

  console.log(saleInfo)
  const getTotal = () => {
    const total = saleInfo?.saleDetails?.reduce(
      (acc: any, item: any) => acc + item.amount * item.price,
      0
    );
    return total;
  };
 
  return (
    <>
      {/* <Product product={saleInfo} /> */}
      <div>
        {/* <h4>{saleInfo.total}</h4> */}
        {saleInfo?.saleDetails?.map((e: any) => (
          <div>
            <div className={styles.saleMap}>
            <h6>Product ID: {e.idProduct}</h6>
            <OrderDetails id={e.id}/>
            <h5>Quantity: {e.amount}</h5>
            <h5>Total item price: {e.price}</h5>
            <h4>Bought on: {saleInfo.date.slice(0,10)}</h4>
            </div>
          </div>
        ))}
        <div><h1>Total: ${getTotal()}</h1></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getSalePathsIds();

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const saleDetails = await findSaleDetails(id);
  return {
    props: {
        saleInfo: saleDetails,
    },
  };
}
