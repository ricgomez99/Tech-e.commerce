import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Image from "next/image";
import landing from "../public/Img/landing.png";
import CarouselLanding from "../components/carousellanding";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="container-fluid text-center">
        <div>
          <h1>Tech E-Commerce</h1>

          <div>
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Excepturi rerum, quo, unde, error necessitatibus debitis tenetur
              tempore assumenda nostrum rem sapiente! Natus, est sint inventore
              exercitationem vel velit molestias. Tempora.
            </p>
          </div>
          <Image src={landing} alt="img" width={350}></Image>
          <button className={styles.card} onClick={() => router.push("/store")}>
            Get Started
          </button>
          <div className={styles.carContainer}>
            <CarouselLanding />
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
