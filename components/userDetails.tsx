import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import Image from 'next/image';
import styles from "styles/userDetails.module.css"

export default function UserDetails() {
  const [user, setUser] = useState<any>({});
  const { data: session } = useSession();
  const email: string | undefined = session?.user?.email?.toString();

  useEffect(() => {
    try {
      (async () => {
        typeof email === "string" ? setUser(await findUniqueUser(email)) : null;
      })();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

      return(
        <div>
          <div>
            <div className={styles.cardContainer}>
              <div className={styles.imageAndName}>
                <Image className={styles.userImage} src={user.image} alt="img" width={150} height={150}/>
            <h1 className={styles.userName}>{user.name}</h1>
            </div>
            </div>
            <div className={styles.emailAndRole}>
            <h5> {user.email} </h5>
            <h5>{user.role}</h5>
            </div>
            </div>
        </div>
    )
}
