import styles from "styles/landingCard.module.css";

type Data = {
  logo: any,
  title: string,
  text: string
};

export default function LandingCard({logo, title, text}: Data) {
  return(
    <div className={styles.steps}>
      <div className={styles.stepsLogo}>{logo}</div>
      <h3 className={styles.stepsTitle}>{title}</h3>
      <p className={styles.stepsText}>{text}</p>
    </div>
  );
};