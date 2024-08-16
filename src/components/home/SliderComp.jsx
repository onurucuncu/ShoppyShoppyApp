import React from "react";
import Slider from "react-slick";

const SliderComp = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="!flex items-center justify-center bg-gray-100">
          <div className="p-5">
            <div className="text-6xl font-bold">Let's run with our SNEAKERS...</div>
            <div className="text-2xl my-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              commodi quasi voluptatum? Distinctio vero maxime rerum, voluptate
              architecto nemo sapiente animi atque eveniet iure dolores rem
              facilis quae non excepturi.
            </div>
            <div className="text-xl font-bold border rounded-full bg-gray-200 cursor-pointer flex items-center justify-center w-[200px] h-10">Review</div>
          </div>
          <img
            src="https://cdn.lescon.com.tr/mnresize/480/-/lescon/upload/urunler/24BAE00MER4M_420_1.jpg"
            alt="lesc1"
          />
        </div>
        <div className="!flex justify-around">
          <img
            src="https://cdn.lescon.com.tr/mnresize/480/-/lescon/upload/urunler/24BAE00BUZ2M_639_1.jpg"
            alt="lesc2"
          />
          <img
            src="https://cdn.lescon.com.tr/mnresize/480/-/lescon/upload/urunler/24BAC00IBZAF_ING_1.jpg"
            alt="lesc3"
          />
          <img
            src="https://cdn.lescon.com.tr/mnresize/480/-/lescon/upload/urunler/24BAE00MARBM_175_1.jpg"
            alt="lesc4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComp;
