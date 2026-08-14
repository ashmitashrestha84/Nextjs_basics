"use client";

import Slider from "react-slick";

interface ProductImageCaroselProps {
  images: string[];
}

const ProductImageCarosel = ({ images }: ProductImageCaroselProps) => {
  const settings = {
    dots: true,
    infinite: images.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    speed: 500,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-60">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="h-60 w-60 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageCarosel;
