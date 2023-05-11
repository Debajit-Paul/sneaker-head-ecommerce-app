import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";

const Menu = ({ showSubMenu, setShowSubMenu }) => {
  const menuData = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ];
  const { data } = useSelector((state) => state.category);

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {menuData?.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              <li
                className=" cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowSubMenu(true)}
                onMouseLeave={() => setShowSubMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />

                {showSubMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] p-1 text-black shadow-lg">
                    {data?.[0]?.map((item) => {
                      return (
                        <Link
                          key={item._id}
                          href={`/categories/${item.slug.current}`}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {item.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className=" cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
