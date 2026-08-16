"use client";

import Image from "next/image";
import Slider from "react-slick";

interface IImage {
  path: string;
}

interface IProps {
  images: IImage[];
}

const ProductImageCarousel = ({ images }: IProps) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: images.length > 1,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-120">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-103 w-full">
            <div className="h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <Image
                src={image.path}
                alt={`Product image ${index + 1}`}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageCarousel;
