import Image from "next/image";
import laptop from '../public/Img/laptop.png';
import mouse from '../public/Img/mouse.png';

export default function Carousel() {
    return(
      <section className="colored-section" id="testimonials">
        <div id="testimonial-carousel" className="carousel slide" data-bs-ride="false">
          <div className="carousel-inner">
            <div className="carousel-item active container-fluid">
              <Image className="testimonials-img" src={mouse} alt="dog-profile" />
            </div>
            <div className="carousel-item container-fluid">
              <Image className="testimonials-img" src={laptop} alt="lady-profile" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>
    );
};