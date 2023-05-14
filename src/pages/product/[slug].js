import React, { useState } from "react";
import { client, urlFor } from "../../../lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addItem, showCart } from "../../../redux/feature/cartSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { RelatedProduct } from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, size } = product;
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleBuyNow = () => {
    notify();
    dispatch(
      addItem({
        ...product,
        quantity: qty,
        size: selectedSize,
      })
    );
    dispatch(showCart());
  };

  return (
    <div>
      <ToastContainer />
      <div className="product-detail-container sm:px-[40px] px-0 sm:gap-[100px] gap-[30px] ">
        <div className="w-full md:w-auto flex-[2] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
          <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[100px]">
            <Carousel
              infiniteLoop={true}
              showIndicators={false}
              showStatus={false}
              showArrows={false}
              thumbWidth={60}
              className="productCarousel"
            >
              {image?.map((img, index) => (
                <img key={index} src={urlFor(image[index])} />
              ))}
            </Carousel>
          </div>
        </div>

        <div className="product-detail-desc flex-[1.5] w-[500px]">
          <h2 className=" sm:text-[30px] text-[20px] font-bold">{name}</h2>
          <p className="price font-bold text-[18px] text-[#F02D34]">
            Rs. {price}.00
          </p>
          <p className=" text-gray-400 text-[15px]">
            <p>incl. of taxes</p>
            <p>(Also includes all applicable duties)</p>
          </p>

          <div className="flex justify-between mt-10 mb-2">
            <div className="text-md font-semibold">Select Size</div>
            <div className="text-md font-medium text-black/[0.5] cursor-pointer">
              Select Guide
            </div>
          </div>

          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
            {size?.map((item, i) => (
              <div
                key={i}
                className={`border rounded-md text-center py-3 font-medium 
                    hover:border-[#F02D34] cursor-pointer ${
                      selectedSize == item ? "border-[#F02D34]" : ""
                    }`}
                onClick={() => {
                  setSelectedSize(item);
                  setShowError(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {showError && (
            <p className=" mt-2 text-red-600">Size selection is required</p>
          )}

          <div className="quantity flex flex-col items-start">
            <h3 className="mt-5 text-md font-semibold">Quantity</h3>
            <p className="quantity-desc flex items-center mt-1 rounded-full">
              <span
                className="minus p-2 px-4"
                onClick={() =>
                  setQty((prev) => {
                    if (prev - 1 < 1) return 1;
                    return prev - 1;
                  })
                }
              >
                <AiOutlineMinus />
              </span>
              <span className="num p-2 px-4">{qty}</span>
              <span
                className="plus p-2 px-4"
                onClick={() => setQty((pre) => pre + 1)}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons flex flex-col">
            <button
              type="button"
              className="add-to-cart rounded-full"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addItem({
                      ...product,
                      quantity: qty,
                      size: selectedSize,
                    })
                  );
                  notify();
                }
              }}
            >
              Add to Bag
            </button>
            <button
              type="button"
              className="buy-now rounded-full"
              onClick={() => handleBuyNow()}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-10">
            <h4 className="text-md mb-1 font-semibold">Details: </h4>
            <p className="text">{details}</p>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2 className=" font-semibold">You may also like</h2>
        <RelatedProduct products={products} />
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
