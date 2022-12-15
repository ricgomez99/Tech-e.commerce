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
        <NotFound
          shortMessage=""
          title="WHO ARE YOU?"
          description="Please log in first to see the content of this page, unless go to the Homepage"
        />
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
