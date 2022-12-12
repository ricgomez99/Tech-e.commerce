import { useEffect, useState } from "react";
import UserOrderHistory from "../../../components/userOrderHistory";
import { findUniqueUser } from "services/userEndPoints";
import { useSession } from "next-auth/react";

export default function userHistory() {

  const [user, setUser] = useState<any>({});
  const [state, setState] = useState<boolean>(true);
  const { data: session } = useSession();
  const email: string | undefined = session?.user?.email?.toString();

  useEffect(() => {
    try {
      (async () => {
        if(typeof email === "string") setUser(await findUniqueUser(email));
      })();
      user && console.log(user)
    } catch (error) {
      console.log(error);
    }
  }, [email, state]);

  return (
    <div>
      <UserOrderHistory id={user.id}/>
    </div>
  );
}


