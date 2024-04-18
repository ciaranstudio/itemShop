import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ images }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    fade: true,
    swipeToSlide: false,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return <img key={index} src={image.imgPath} alt={image.label} />;
      })}
    </Slider>
  );
}
