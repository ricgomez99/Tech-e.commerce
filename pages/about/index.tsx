import Layout from "../../components/layout";
import Image from "next/image";
import logo from "../../public/Img/e-commerce.png";
import styles from "../../styles/about.module.css";
import { MdOutlineArrowBack } from "react-icons/md";
import Router from "next/router";
import style from "styles/product.module.css";

export default function About() {
  return (
    <Layout>
      
      <div className={styles.everythingAbout}>
      <MdOutlineArrowBack
            onClick={() => Router.back()}
            className={style.backBtn}
          />
        <div>
      
        </div>
        <div className={styles.titleAbout}>
          <Image className={styles.logoAbout} src={logo} alt="img"></Image>
          <h1>Tech-E-Commerce</h1>
        </div>
        <div className={styles.namesAbout}>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/andres-gomez-restrepo">Ricardo Gómez</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jose-mendez-6215b6150">José Méndez</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/felipe-hernandez-72037b248/">Felipe Hernández</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/juan-jos%C3%A9-bogado-ab0480245/">Juan José Bogado </a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joaquin-maza">Joaquín Maza</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/martina-girollet-61790425a/">Martina Girollet</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nicolas-rojas-castro-65b156150/">Nicolás Rojas</a>
          <a className={styles.names} target="_blank" rel="noopener noreferrer" href="http://linkedin.com/in/antonio-michel-952296bb">Antonio Michel</a>
        </div>
        <p className={styles.paragraphAbout}>
          We are the Fullstack Street Guys team, and our mission with this
          project is to make a friendly and suitable enviroment for all kind of
          users that want to set up their work, study and gaming space. Since we
          started studying FullStack Web Development in Soy Henry, we realized
          there is a problem when a common user starts diving in the IT world,
          wheter to work, study, or just play video games, and is that you need
          to be confortable, and to fulfill this conformity, we developed this
          website. Do you need an ergonomic chair to make your back feel better?
          We have it!. Are you tired of being sitted in the same position? We
          have the best standing desktop for you! Or you just want a brand new
          laptop with a gaming keyboard? Well, this is the best site you could ever be! We
          have all of these and a whole lot more. We hope you enjoy and have the
          very best time navigating our website. Designed and built with all the
          love in the world.
        </p>
      </div>
    </Layout>
  );
}
