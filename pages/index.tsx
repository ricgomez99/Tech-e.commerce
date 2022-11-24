import Head from "next/head";
//import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Footer from "../components/footer";

export default function Home() {
  return (
    <Layout>
      <div className={styles.main}>
        <div>
          <div>
            <div>
              <h1>Welcome to the Landing page!</h1>
            </div>
            <div>Imagen</div>
          </div>
          <button className={styles.card}>Get Started</button>
          <div>Carrusel de productos?</div>
          <div>Carrusel de imagenes</div>
          <button className={styles.card}>Get Offer</button>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
