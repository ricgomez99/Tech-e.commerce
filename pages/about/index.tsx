import Layout from "../../components/layout";
import Image from "next/image";
import logo from "../../public/Img/e-commerce.png";
import styles from "../../styles/about.module.css";
import Router from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";

export default function About() {
  return (
    <Layout>
      <div className={styles.everythingAbout}>
        <div>
          <button onClick={() => Router.back()} className="btn btn-secondary">
            <MdOutlineArrowBack />
          </button>
        </div>
        <div className={styles.titleAbout}>
          <Image className={styles.logoAbout} src={logo} alt="img"></Image>
          <h1>Tech-E-Commerce</h1>
        </div>
        <div className={styles.namesAbout}>
          <h6>Ricardo Gómez</h6>
          <h6>José Méndez</h6>
          <h6>Felipe Hernández</h6>
          <h6>Juan José Bogado </h6>
          <h6>Joaquín Maza</h6>
          <h6>Martina Girollet</h6>
          <h6>Nicolás Rojas</h6>
          <h6>Antonio Michel</h6>
        </div>
        <p className={styles.paragraphAbout}>
          We are the Fullstack Street Guys team, and our mission with this
          project is to make a friendly and suitable enviroment for all kind of
          users that want to set up their work, study and gaming space. Since we
          started studying FullStack Web Development in Soy Henry, we realized
          there's a problem when a common user starts diving in the IT world,
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
