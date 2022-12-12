import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import Image from 'next/image';

export default function userDetails(){
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

      console.log(user)
      return(
        <div>
            <div>
                <Image src={user.image} alt="img" width={40} height={40}/>
            </div>
            <h1>{user.name}</h1>
            <h5>{user.email}</h5>
        </div>
    )
}