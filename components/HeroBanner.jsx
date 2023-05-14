import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto mt-6">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute rounded-full left-2 md:left-2 top-[40%] md:top-[45%] w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-[1] flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute rounded-full right-2 md:right-2 top-[40%] md:top-[45%] w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black  flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {heroBanner.map((banner, i) => {
          return (
            <div key={i}>
              <img
                src={urlFor(banner.image)}
                className="object-cover rounded-2xl"
              />
              <Link href={`/product/${banner.slug.current}`}>
                <div className="px-[8px] md:px-[40px] py-[8px] md:py-[25px] font-oswald bg-[#F02D34] absolute bottom-[15px] md:bottom-[75px] left-0 text-black/[0.9] text-[10px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                  {banner.buttonText}
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
