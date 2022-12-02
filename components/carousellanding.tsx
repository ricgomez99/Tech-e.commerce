import Carousel from "react-bootstrap/Carousel";
import mouse from "../public/Img/mouse.png";
import desktop from "../public/Img/desktop.png";
import chair from "../public/Img/chair.png";
import display from "../public/Img/display.png";
import headphone from "../public/Img/headphones.png";
import keyboard from "../public/Img/keyboard.png";
import webcam from "../public/Img/webcam.png";
import laptop from "../public/Img/laptop.png";
import Image from "next/image";
import st from "../styles/carouselLanding.module.css";

export default function CarouselLanding() {
  return (
    <div  className={st.carContainer}>
      <h4>Categories</h4>
    <Carousel fade className={st.car} variant="dark" interval = {null}>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={headphone} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={keyboard} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={chair} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={laptop} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={webcam} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={mouse} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={display} alt="Second slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className={`d-block w.100 ${st.carouselImg}`} src={desktop} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
