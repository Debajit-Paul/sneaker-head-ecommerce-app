import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      {/* {console.log(heroBanner)} */}
      <div>
        <p className="beats-solo font-semibold">{heroBanner.midText}</p>
        <h1 className=" font-semibold">{heroBanner.largeText1}</h1>
        <h3>{heroBanner.smallText}</h3>

        <img
          src={urlFor(heroBanner.image)}
          alt=""
          className="absolute top-5 right-7 w-[750px] h-[450px]"
        />

        <div>
          <Link href="/product/ID">
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
