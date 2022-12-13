import Layout from "components/layout"
import SalesDetails from "./[id]"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import { findSaleDetails } from "services/saleEndPoints";
import { getSalePathsIds } from "utils/salePaths";

export default function MoreDetails({id}: any){

    // const [user, setUser] = useState<any>({});
    // const [state, setState] = useState<boolean>(true);
    // const { data: session } = useSession();
    // const email: string | undefined = session?.user?.email?.toString();
  
    // useEffect(() => {
    //   try {
    //     (async () => {
    //       if(typeof email === "string") setUser(await findUniqueUser(email));
    //     })();
    //     user && console.log(user)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, [email, state]);

    // const [order, setOrder] = useState<any>({});
  
    // useEffect(() => {
    //   try {
    //     (async () => {
    //       id ? setOrder(await findSaleDetails(id)) : null;
    //     })();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, [id]);

    return(
        <Layout>
    <div>
        {/* <SalesDetails id={user.id}/> */}
        Nothing here
    </div>
    </Layout>
    )
}

// export async function getStaticPaths() {
//     const paths = await getSalePathsIds();
  
//     return {
//       paths: paths,
//       fallback: "blocking",
//     };
//   }
  