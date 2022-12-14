import UserCard from "components/userCard";
import Layout from "components/layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setUser(data);
        console.log(data);
      }
    })();
  }, [email]);

  return (
    <Layout>
      <div>
        <UserCard />
      </div>
    </Layout>
  );
}
