import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";

const RelatedProduct = ({ products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mt-[50px] md:mt-[50px] mb-[200px] md:mb-0">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        containerClass="mx-[20px]"
        itemClass="px-[10px]"
        responsive={responsive}
      >
        {products.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProduct;
