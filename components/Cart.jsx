import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { FiTrash } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  showCart,
  updateQuantity,
  removeItem,
} from "../redux/feature/cartSlice";
import { urlFor } from "../lib/client";
import { useRouter } from "next/router";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const router = useRouter();
  const cartRef = useRef();
  const { isshowCart, items } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    setSubTotal(
      items.reduce((total, value) => total + value.price * value.quantity, 0)
    );
  }, [items]);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    // toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper " ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => dispatch(showCart())}
        >
          <VscChromeClose />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({items.length} items)</span>
        </button>

        {items.length < 1 && (
          <div className="empty-cart flex flex-col items-center">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => dispatch(showCart())}
                className="btn items-center"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {items.length >= 1 &&
            items.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="md:w-[120px] md:h-[130px] w-[120px] h-[130px] rounded-[15px] bg-[#ebebeb]"
                />

                <div className="flex flex-col">
                  <div className=" flex flex-wrap justify-between items-center gap-2">
                    <h5 className=" text-lg font-bold text-[30px] truncate md:w-[250px] w-[180px]">
                      {item.name}
                    </h5>
                    <h4 className=" font-bold text-[#324d67]">
                      Rs. {item.price * item.quantity}
                    </h4>
                  </div>
                  <p className=" text-gray-500 text-sm">Size: {item.size}</p>
                  <div className="flex gap-8 mt-2">
                    <p className="quantity-desc w-[120px] flex items-center rounded-full">
                      <span
                        className="minus px-2"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              ...item,
                              quantity:
                                item.quantity - 1 < 1 ? 1 : item.quantity - 1,
                            })
                          )
                        }
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num px-4" onClick="">
                        {item.quantity}
                      </span>
                      <span
                        className="plus px-2"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              ...item,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>

                    <button
                      type="button"
                      className="remove-item hover:bg-gray-100 rounded-full p-2"
                      onClick={() => dispatch(removeItem({ _id: item._id }))}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {items.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>Rs. {subTotal}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  userInfo
                    ? handleCheckout()
                    : router.push("/login") && dispatch(showCart())
                }
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
