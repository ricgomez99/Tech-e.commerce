import Head from "next/head";
//import Image from "next/image";
import styles from "../styles/Home.module.css";
// import Layout from "../components/layout.tsx";
// import Footer from "../components/footer.tsx";

export default function Home() {
  return (
    // <Layout>
    <div className={styles.main}>
      <div>
        <div>
          <h1>Info de la landing</h1>
          <h1>Imagen</h1>
        </div>
        <button className={styles.card}>Get Started</button>
        <div>Carrusel de productos?</div>
        <h1>Carrusel de imagenes</h1>
        <button className={styles.card}>Get Offer</button>
      </div>
      {/* <Footer/> */}
      <footer className={styles.footer}>
        El footer que hizo Felipe
      </footer>
    </div>
    // </Layout>
  );
}
