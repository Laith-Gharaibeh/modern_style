"use client";
// next
import Link from "next/link";
// react
import { useState, useEffect } from "react";
// react-icons
import { HiBars3 } from "react-icons/hi2";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Shop", href: "/shop", current: false },
  { name: "Blog", href: "/blog", current: false },
  { name: "Login", href: "/login", current: false },
];

const Navbar = () => {
  // states
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // effects
  useEffect(() => {
    const mainElement = document.querySelector("main");

    if (window.innerWidth < 768) {
      setIsLargeScreen(false);
      mainElement.style.paddingTop = "42px";
    } else {
      mainElement.style.paddingTop = "58px";
    }
  }, []);

  // functions
  const navbarHandler = () => {
    setShowNavbar((prevState) => !prevState);
  };

  let navbarStyle = { height: "calc(100% - 42px)" };

  return (
    <header className="fixed z-50 top-0 w-full bg-white  border-2 border-b-gray-200 dark:border-0 dark:border-b-2 dark:border-b-gray-500 p-2 md:p-4">
      <nav className="container flex items-center justify-between ">
        <Link href="/" className="text-gray-700">
          Modern Style
        </Link>

        <HiBars3 onClick={navbarHandler} className="md:hidden" />

        <div
          className={`flex items-center gap-5 overflow-hidden transition-[height] ease-in-out duration-300
          ${
            isLargeScreen
              ? "relative"
              : " justify-center flex-col fixed top-[42px] h-0 left-0 w-full bg-stone-600 "
          }
          `}
          style={showNavbar ? navbarStyle : {}}
        >
          {navigation.map((singleLink, index) => {
            return (
              <Link
                key={index}
                href={singleLink.href}
                className="text-gray-700"
              >
                {singleLink.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
