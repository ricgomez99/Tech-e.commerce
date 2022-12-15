import styles from "styles/notFound.module.css";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

export default function NotFound({
  shortMessage = "Oops!",
  title = "404 NOT FOUND",
  description = "The Page you are looking for might have been removed, had its name changed or its temporarily unavailable",
  button = true,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.oops}> {shortMessage} </div>
      <div className={styles.text}>
        <h1 className="text-center">{title}</h1>
        <h2 className={`${styles.description} text-center fs-2`}>
          {description}
        </h2>
      </div>
      <div>
        {button && (
          <Button
            className={styles.button}
            variant="primary"
            role="link"
            onClick={() => router.push("/")}
          >
            GO TO HOMEPAGE
          </Button>
        )}
      </div>
    </div>
  );
}
