import Image from "next/image";
import Link from "next/link";
// import githubLogo from "../public/Img/githubLogo.png";
import styles from "../styles/footer.module.css";
import { GoMarkGithub } from "react-icons/go";


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
             <GoMarkGithub />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
