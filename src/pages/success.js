import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/feature/cartSlice";
import { runFireworks } from "../../lib/utils";

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCart());
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success w-[500px] flex flex-col gap-3">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-mesg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have questions, please email
          <a className="email" href="mailto:debajitfan@gmail.com">
            debajitfan@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
