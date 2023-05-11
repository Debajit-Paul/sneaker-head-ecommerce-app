import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product }) => {
  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
        <img
          src={urlFor(product.image && product.image[0])}
          className=" rounded-2xl h-[400px] w-[500px] object-cover"
        />
        <div>
          <p className="product-name  mt-4">{product.name}</p>
          <p className="product-price">Rs. {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
