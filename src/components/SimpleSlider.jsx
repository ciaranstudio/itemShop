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
    slidesToShow: 1, // images.length
    slidesToScroll: 1,
    accessibility: true,
    fade: true,
    waitForAnimate: false,
    autoplay: true,
    speed: 1000,
    pauseOnFocus: true,
    pauseOnHover: true,
    swipeToSlide: true,
    // adaptiveHeight: true,
    // vertical: true,
    // verticalSwiping: true,
    // centerMode: true,
    // centerPadding: "1rem",
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return <img key={index} src={image.imgPath} alt={image.label} />;
      })}
    </Slider>
  );
}
