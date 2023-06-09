import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { showCart } from "../redux/feature/cartSlice";
import { userLogOut } from "../redux/feature/userSlice";
import Cart from "./Cart";
import { Menu, MobileMenu } from "./";

const Navbar = () => {
  const { isshowCart, items } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="w-full h-[50px] md:h-[80px] bg-[#ffffff] flex items-center justify-between px-8 transition-transform duration-300">
      <p className="logo">
        <Link href="/">
          <img
            src="/logo.svg"
            className=" md:w-[120px] md:h-[110px] w-[80px] h-[75px] cursor-pointer"
          />
        </Link>
      </p>

      <Menu showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} />

      {mobileMenu && (
        <MobileMenu
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
          setMobileMenu={setMobileMenu}
        />
      )}

      <div className="flex items-center gap-4 text-black">
        {userInfo ? (
          <div
            title="LogOut"
            className="cursor-pointer flex gap-2 items-center bg-slate-900 rounded-full text-white p-1 px-3"
            onClick={() => dispatch(userLogOut())}
          >
            {userInfo.name}
            <MdLogout size={14} />
          </div>
        ) : (
          <div className=" font-semibold">
            <Link href={"/login"}>LogIn</Link>
          </div>
        )}

        <div className="flex items-center gap-8 ">
          <button
            type="button"
            className="cart-icon p-2 hover:bg-gray-200 rounded-full"
            onClick={() => dispatch(showCart())}
          >
            <AiOutlineShopping />

            {items.length > 0 && (
              <span className="cart-item-qty">{items.length}</span>
            )}
          </button>
        </div>
        {isshowCart && <Cart />}

        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.1] cursor-pointer relative -mr-2">
          {mobileMenu ? (
            <VscChromeClose
              className="text-[16px]"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <BiMenuAltRight
              className="text-[20px]"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
