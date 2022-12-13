import Image from "next/image"
import userProfile from ".././public/Img/user.png"
import styles from "../styles/user.module.css"
import UserHistory from "pages/profile/user/[id]"
import UserDetails from "./userDetails"

export default function userCard() {
    return (
     <div className={styles.general}>
      <div className={styles.mainTitle}>
      </div>
      <div className={styles.detailsCard}>
      {/* <Image src={userProfile} alt="img" width={200} height={200}>
      </Image> */}
      <UserDetails/>
      </div>
      <div className={styles.purchaseOrders}>
        <UserHistory/>
      </div>
      </div> 
    )
}