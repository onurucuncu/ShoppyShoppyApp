import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", left: 50, zIndex:1000 }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", right: 50 }}
      onClick={onClick}
    />
  );
}



const Product = ({ product }) => {

  const [sliderClicked, setSliderClicked] = useState(false)
  const navigate = useNavigate();

  const handleSliderClick = (e) => {
    e.stopPropagation()
    setSliderClicked(true)
  }

  const handleProductClick = () => {
    if(!sliderClicked) {
      navigate(`products/${product?.id}`)
    } 
      setSliderClicked(false) 
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: () => setSliderClicked(true),
    onClick: handleSliderClick
  };
  
  return (
    <div
      onClick={handleProductClick}
      className="w-[420px] mb-5 border bg-white rounded-md relative cursor-pointer"
    >
      <div className="absolute top-0 right-0 bg-black text-white text-xl p-2 m-1 rounded-lg">
        {product?.price} <span className="text-sm font-bold">TL</span>
      </div>
      {/* <button className="absolute top-12 right-0 bg-slate-400 text-white text-xl p-1 m-1 rounded-lg">Product Info</button> */}
      <div onClick={(e) => e.stopPropagation()}>
        <Slider {...settings}>
        <div>
          <img
            className="w-[200px] h-[200px] m-auto p-5"
            src={product?.image}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[200px] h-[200px] m-auto p-5 rotate-45"
            src={product?.image}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[200px] h-[200px] m-auto p-5 -rotate-45"
            src={product?.image}
            alt=""
          />
        </div>
      </Slider>
      </div>
      <div className="text-center font-bold my-10">{product?.title}</div>
    </div>
  );
};

export default Product;
