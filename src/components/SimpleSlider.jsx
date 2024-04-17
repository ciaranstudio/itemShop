import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ images }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, // images.length
    slidesToScroll: 1,
    accessibility: true,
    fade: true,
    swipeToSlide: false,
    // onInit: () => {
    //   // console.log("initialized slider");
    // },
    // onReInit: () => {
    //   setTimeout(() => {
    //     console.log("showing slider");
    //     setShowSlider(true);
    //   }, 5000);
    // },
    // waitForAnimate: false,
    // autoplay: true,
    // speed: 1000,
    // pauseOnFocus: true,
    // pauseOnHover: true,

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
        return (
          <img
            key={index}
            src={image.imgPath}
            alt={image.label}
            // width="20rem"
            // height="30rem"
          />
        );
      })}
    </Slider>
  );
}
