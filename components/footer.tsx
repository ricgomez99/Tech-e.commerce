import Image from "next/image";
import Link from "next/link";
import githubLogo from "../public/Img/githubLogo.png";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className={styles.footer}>
          <nav className={styles.nav}>
            <Link className={styles.aboutus} href="/about">
              About Us
            </Link>
            <p className={styles.paragraph}>
              Designed and built with all the love in the world by the Fullstack
              Street Guys team.
            </p>
            <a
              className={styles.logo}
              href="https://github.com/ricgomez99/Tech-e.commerce"
            >
              <Image src={githubLogo} alt="img" width={40} height={40}></Image>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
