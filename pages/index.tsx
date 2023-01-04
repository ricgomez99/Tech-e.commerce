import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Image from "next/image";
import landing from "../public/Img/landing.webp";
import CarouselLanding from "../components/carousellanding";
import { useRouter } from "next/router";
import LandingCard from "../components/landingCard";
import { FiShoppingCart } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { BsCreditCard } from "react-icons/bs";
//IntersectionObserver Hook
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView, entry: newEntry } = useInView();
  const { ref: myRef, inView: elementIsVisible, entry } = useInView();
  const { ref: carRef, inView: catVisible, entry: lastEntry } = useInView();
  const router = useRouter();

  return (
    <Layout>
      <div
        ref={ref}
        className={`${styles.container}  ${inView ? styles.animateText : ""}`}
      >
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
      <div
        ref={myRef}
        className={`${styles.stepsContainer} ${
          elementIsVisible ? styles.animateContainer : ""
        }`}
      >
        <div>
          <LandingCard
            logo={<GoSearch />}
            title="Search it"
            text="Search across 8 different categories and over 100 products that are available to find whatever you want."
          />
        </div>
        <div>
          <LandingCard
            logo={<FiShoppingCart />}
            title="Add it"
            text="Add products to the shopping cart directly 
                from the store page or take a look at the
                product details."
          />
        </div>
        <div>
          <LandingCard
            logo={<BsCreditCard />}
            title="Buy it"
            text="Go to checkout, review or update your
                order and proceed to payment easily."
          />
        </div>
      </div>
      <div
        ref={carRef}
        className={`${styles.carousel} ${catVisible ? styles.catAnimated : ""}`}
      >
        <h2>Our Categories</h2>
        <p>
          The categories will allow you to sort and explore all the products
          available, making smoother your shopping experience.
        </p>
        <CarouselLanding />
      </div>
    </Layout>
  );
}
