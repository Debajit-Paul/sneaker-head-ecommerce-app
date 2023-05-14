import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";

const MobileMenu = ({ showSubMenu, setShowSubMenu, setMobileMenu }) => {
  const menuData = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const { data } = useSelector((state) => state.category);
  return (
    <ul className="flex flex-col pt-2 md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {menuData.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowSubMenu(!showSubMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showSubMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4 px-5">
                    {data?.[0]?.map((item) => {
                      return (
                        <Link
                          key={item._id}
                          href={`/categories/${item.slug.current}`}
                        >
                          <li
                            className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md"
                            onClick={() => {
                              setShowSubMenu(false);
                              setMobileMenu(false);
                            }}
                          >
                            {item.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li
                className="py-4 px-5 border-b"
                onClick={() => setMobileMenu(false)}
              >
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MobileMenu;
