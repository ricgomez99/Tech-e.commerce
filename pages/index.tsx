import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Image from "next/image";
import landing from "../public/Img/landing.webp";
import CarouselLanding from "../components/carousellanding";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container_all}>
          <div className={styles.text}>
            <h1>Set your env up!</h1>
            <p className={styles.description}>
              Setting up your working environment could be tedious and takes a
              lot of time, while searching for the right components, the perfect
              display, or even choosing a comfortable chair would make you feel
              overwhelmed.
            </p>
            <p className={styles.subDescription}>
              Get rid of all those issues with our{" "}
              <span className={styles.products}>150 products</span>, all in one
              place, and completely available for you in just one click.
            </p>
          </div>
          <div className={styles.ImageContainer}>
            <Image
              className={styles.mainImage}
              src={landing}
              alt="img"
              width={650}
            ></Image>
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles.card} onClick={() => router.push("/store")}>
            Get Started
          </button>
        </div>
      </div>
      <div className={styles.carousel}>
        <h2>Our Categories</h2>
        <p>
          The categories will allow you to sort and explore all the products
          available, making smoother your shopping experience.
        </p>
        <CarouselLanding />
      </div>
      <Footer />
    </Layout>
  );
}
