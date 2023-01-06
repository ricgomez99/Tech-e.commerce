import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/paymentSuccess.module.css";

export default function PaymentSuccessful() {
  const router = useRouter();

  return (
    <div className={styles.box}>
      <section className={styles.summary}>
        <Image
          src="/Img/paymentSuccess.svg"
          alt="Payment Successful"
          width={270}
          height={270}
          className={styles.successImg}
        />
        <h3 className={styles.title}>Payment Successful</h3>
        <div className={styles.text}>
          <p className={styles.resume}>
            The order was completed successfully! It will be shipped as soon as
            possible.
          </p>
          <p className={styles.next}>
            You will be emailed with the details shortly, thanks for choosing
            us.
          </p>
        </div>
      </section>
      <div className={styles.return}>
        <button
          className={styles.backBtn}
          onClick={() => router.push("/store")}
        >
          Go to store
        </button>
      </div>
    </div>
  );
}
