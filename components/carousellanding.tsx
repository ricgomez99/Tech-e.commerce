import Carousel from "react-bootstrap/Carousel";
import mouse from "../public/Img/mouse.png";
import laptop from "../public/Img/laptop.png";
import desktop from "../public/Img/desktop.png";
import chair from "../public/Img/chair.png";
import display from "../public/Img/display.png";
import headphone from "../public/Img/headphones.png";
import keyboard from "../public/Img/keyboard.png";
import webcam from "../public/Img/webcam.png";
import Image from "next/image";
import st from "../styles/Home.module.css";

export default function CarouselLanding() {
  return (
    <Carousel fade className={st.car}>
      <Carousel.Item>
        <Image className="d-block w-100" src={headphone} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={keyboard} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={chair} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={display} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={webcam} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={mouse} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={laptop} alt="Second slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={desktop} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
