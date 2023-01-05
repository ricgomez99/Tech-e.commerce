import styles from "styles/notFound.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  button?: boolean;
}

export default function NotFound({ button }: Props) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <section className={styles.feedback}>
        <Image
          src="/Img/notFound.svg"
          alt="not Found"
          width={450}
          height={450}
          className={styles.img}
        />
        <h4 className={styles.errorMsg}>
          Sorry we could not find the content you are looking for
        </h4>
        {button && (
          <button onClick={() => router.push("/")} className={styles.backBtn}>
            Go to homepage
          </button>
        )}
      </section>
    </div>
  );
}
