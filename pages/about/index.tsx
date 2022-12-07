import Layout from "../../components/layout";
import Image from "next/image";
import logo from "../public/Img/e-commerce.png";
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex illo
          doloribus labore, eius adipisci nemo ipsum necessitatibus recusandae
          consequatur accusamus distinctio iusto sapiente iste inventore.
          Aspernatur optio velit error ex Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dignissimos incidunt, aut magni rerum adipisci, eum
          aperiam praesentium sint, blanditiis odio modi perspiciatis quod animi
          laboriosam quia iure reiciendis mollitia aspernatur Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Sint iste, porro sequi nemo
          eius voluptatum! Et nisi, dolorum sequi doloribus nihil culpa maiores
          repellat fugiat aliquam cupiditate nobis quia soluta?
        </p>
      </div>
    </Layout>
  );
}
