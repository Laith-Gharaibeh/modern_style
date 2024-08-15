"use client";
// next
import { useRouter } from "next/navigation";
import Link from "next/link";
// react
import { useState, useEffect } from "react";
// NextAuth
import { signOut, useSession } from "next-auth/react";
// packages
import Cookies from "js-cookie";
import { HiBars3 } from "react-icons/hi2";
// utilities
import { baseUrl, postRequest } from "@/utilities/postRequest";
import { logoutUserSocketUtil } from "@/utilities/socketClient";

const Navbar = (props) => {
  // console.log("[Navbar.jsx] props = ", props);
  const { lang } = props;
  const { data: session } = useSession();
  const router = useRouter();
  // console.log("[Navbar.jsx] session = ", session);

  let username = null;
  let userId = null;

  if (session) {
    username = session.user.name;
    userId = session.user.id;
  }

  const { home, shop, blog, login, logout } = props.navbarWords;

  const navigation = [
    { name: home, href: "/", current: true },
    { name: shop, href: "/shop", current: false },
    { name: blog, href: "/blog", current: false },
    { name: login, href: "/login", current: false },
    { name: logout, href: "/", current: false },
  ];
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

  const logoutHandler = async () => {
    console.log("[Navbar.jsx] logoutHandler");

    // const response = await fetch(baseUrl + "/users/logoutUser", {
    const response = await fetch("http://localhost:3000/api/users/logoutUser", {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();

    console.log("[Navbar.jsx] logout result = ", result);

    /* CORS:
      - cross-origin request: when (X website) sends a request to fetch data from (Y website) 
      - same-origin policy  : it is responsible for controlling whether this request will happen or not,
        no website can read a response from another website unless three conditions are met: 
          1- the same protocol: if (X website) uses http protocol, (Y website) must use http protocol.
          2- the same hostname: http://www.X.com 
          3- the same port    : http://www.X.com:8080

    */
    // if (result.message === "logoutSuccessfully") {
    if (result) {
      await signOut({
        callbackUrl: `/${lang}/login`,
        redirect: false,
      });

      console.log("[Navbar.jsx] logout() userId = ", userId);

      logoutUserSocketUtil(userId);

      router.replace("/" + lang);
      window.location.reload();
      /*
      window.location.reload() :
        - to solve a websocket issue, because if I didn't reload the page and use the same browser tab when I login again I will get the following error on the server :
          uncaughtException: Error: listen EADDRINUSE: address already in use :::5000
     */
    }
  };

  let navbarStyle = { height: "calc(100% - 42px)" };

  return (
    <header className="fixed z-50 top-0 w-full bg-white  border-2 border-b-gray-200 dark:border-0 dark:border-b-2 dark:border-b-gray-500 p-2 md:p-4">
      <nav className="container flex items-center justify-between ">
        <Link href={`/${lang}/`} className="text-gray-700">
          Modern Style
        </Link>

        <HiBars3 onClick={navbarHandler} className="md:hidden text-gray-700" />

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
          <Link href={`/${lang}/`} className="text-gray-700 capitalize">
            {navigation[0].name}
          </Link>
          <Link href={`/${lang}/shop`} className="text-gray-700 capitalize">
            {navigation[1].name}
          </Link>
          <Link href={`/${lang}/blog`} className="text-gray-700 capitalize">
            {navigation[2].name}
          </Link>
          {username ? (
            <>
              <Link
                href={`/${lang}/userProfile`}
                className="py-1 px-2 bg-orange-300 text-white"
              >
                {username}
              </Link>
              {/* <Link href={`/${lang}/`} className="text-red-700 capitalize"> */}
              <Link
                href=""
                className="text-red-700 capitalize"
                onClick={logoutHandler}
                // onClick={() =>
                //   signOut({
                //     // callbackUrl: `http://localhost:3001/${lang}`,
                //     callbackUrl: `/${lang}`,
                //     redirect: false,
                //     cookie: true,
                //   })
                // }
              >
                {navigation[4].name}
              </Link>
            </>
          ) : (
            <Link href={`/${lang}/login`} className="text-gray-700 capitalize">
              {navigation[3].name}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
