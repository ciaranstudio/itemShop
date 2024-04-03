import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
    },
    {
      label: "Bird",
      imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
    },
    {
      label: "Bali, Indonesia",
      imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
    },
    {
      label: "Bird",
      imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
    },
    {
      label: "Bali, Indonesia",
      imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length,
    slidesToScroll: 1,
    accessibility: true,
    // adaptiveHeight: true,
    // swipeToSlide: true,
    // fade: true,
    waitForAnimate: false,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return <img key={index} src={image.imgPath} alt={image.label} />;
      })}
    </Slider>
  );
}
