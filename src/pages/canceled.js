import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

const Canceled = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel w-[500px] flex flex-col gap-3">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Sorry your order got Canceled!</h2>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
