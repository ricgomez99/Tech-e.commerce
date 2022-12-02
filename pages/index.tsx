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
              <h1>Tech E-Commerce</h1>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Excepturi rerum, quo, unde, error necessitatibus debitis tenetur
                tempore assumenda nostrum rem sapiente! Natus, est sint inventore
                exercitationem vel velit molestias. Tempora. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Aliquid quasi, sed esse nobis rerum
                itaque! Ut repellat harum rerum molestias voluptate quibusdam assumenda
                praesentium nobis minima numquam. Dicta, eligendi a.
              </p>
            </div>
            <div>
              <Image src={landing} alt="img" width={650}></Image>
            </div>
          </div>
          <div className={styles.btn}>
          <button className={styles.card} onClick={() => router.push("/store")}>
            Get Started
          </button>
          </div>
          </div>
          <div className={styles.carousel}>
            <CarouselLanding />
          </div>
        <Footer />
    </Layout>
  );
};
