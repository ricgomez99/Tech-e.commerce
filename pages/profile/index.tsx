import UserCard from "components/userCard";
import Layout from "components/layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import NotFound from "components/notFound";

export default function Profile() {
  const [user, setUser] = useState<any>({});
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

  if (!session) {
    return (
      <Layout>
        <NotFound button={false} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <UserCard />
      </div>
    </Layout>
  );
}
