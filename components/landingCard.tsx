import styles from "styles/landingCard.module.css";

type Data = {
  logo: any,
  title: string,
  text: string
};

export default function LandingCard({logo, title, text}: Data) {
  return(
    <div>
      <div className={styles.stepsLogo}>{logo}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};