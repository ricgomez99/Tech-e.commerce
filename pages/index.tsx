import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Image from "next/image";
import landing from "../public/Img/landing.webp";
import CarouselLanding from "../components/carousellanding";
import { useRouter } from "next/router";
import LandingCard from "components/landingCard";
import { FiShoppingCart } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { BsCreditCard } from "react-icons/bs";

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
      <div className={styles.steps}>
        <LandingCard 
          logo={<GoSearch/>}
          title="Search products"
          text="We have 8 different categories for 
                an easier searching process, and over
                100 products for you to find whatever
                you are looking for."
        />   
      </div>
      <div className={styles.steps}>
        <LandingCard 
          logo={<FiShoppingCart/>}
          title="Add it to cart"
          text="Add products to the shopping cart directly 
                from the store page or take a look at the
                product details and add them when you are ready."
        />
      </div>
      <div className={styles.steps}>
        <LandingCard
          logo={<BsCreditCard/>}
          title="Buy it"
          text="Go to checkout, review or update your
                order and proceed to payment easily."
        />
      </div>
      <div className={styles.carousel}>
        <CarouselLanding />
      </div>
      <Footer />
    </Layout>
  );
}
