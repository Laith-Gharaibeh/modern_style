/*
  - this code here before using the socket as a provider
*/

"use client";
// Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";
// React.js
import { useEffect, useState } from "react";
// NextAuth
import { signIn, useSession } from "next-auth/react";
// packages
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
// utilities
import { baseUrl, postRequest } from "@/utilities/postRequest";
// import socketClient from "@/utilities/socketClient";
import { io } from "socket.io-client";
// components
import Spinner from "@/components/Spinner";

const FormLogin = (props) => {
  const { lang } = props;
  // console.log("[FormLogin.jsx] lang = ", lang);
  const router = useRouter();
  const { data: session } = useSession();
  // const locale = lang;
  // const redirectUrl = `/${locale}/register`;

  const [socket, setSocket] = useState(null);
  const [isRequestRunning, setIsRequestRunning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    loginError: "",
  });

  // if (session) {
  //   router.replace(redirectUrl);
  // }

  // effects
  // useEffect(() => {
  //   console.log("session = ", session);
  // }, [session]);

  // useEffect(() => {
  //   // const socket = io.on("userLoggedIn", (userId) => {
  //   //   console.log(`User with ID ${userId} has logged in`);
  //   //   // Perform any necessary actions here
  //   // });
  //   if (isLoggedIn) {
  //     const socket = io("http://localhost:5000");
  //     console.log("socket = ", socket);
  //   }

  //   // return () => {
  //   //   socketClient.off("userLoggedIn");
  //   // };
  // }, [isLoggedIn]);

  // ------------------------------------------------
  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // const socket = io("http://localhost:5000");
      setSocket(io("http://localhost:5000"));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // if (isLoggedIn) {
    if (socket) {
      socket.emit("newUser", session.user.name);
      console.log("socket = ", socket);
      console.log("session = ", session);
    }
  }, [socket]);
  // ------------------------------------------------

  // translation
  const pageWords = props.pageWords;

  // functions
  const submitHandler = async (e) => {
    console.log("Login user...");
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
      loginError: "",
    });

    if (email.trim().length === 0) {
      setErrors((prev) => ({ ...prev, email: pageWords.fillInTheEmail }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (password.length === 0) {
      setErrors((prev) => ({ ...prev, password: pageWords.fillInThePassword }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    setIsRequestRunning(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("[FormLogin.jsx] response = ", response);

      setIsRequestRunning(false);

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          loginError: pageWords.emailOrPasswordError,
        }));
        return;
      }

      if (response.error) {
        // setErrors((prev) => ({ ...prev, loginError: response.error }));
        setErrors((prev) => ({ ...prev, loginError: pageWords.failedToLogin }));
        return;
      }

      // ----- I don't know why this way didn't work -----
      // router.replace(`${lang}/register`);
      // router.replace(`/register`);
      // ----- // I don't know why this way didn't work -----
      setIsLoggedIn(true);
      const redirectUrl = `/${lang}/`;

      router.replace(redirectUrl);
    } catch (error) {
      console.log("[FormLogin.jsx] catch error = ", error);
    }
  };

  return (
    <>
      <form
        className="w-full max-w-sm px-[10px] py-[40px] bg-orange-400"
        onSubmit={submitHandler}
      >
        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            {pageWords.email}
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoFocus
              // autoComplete="email"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && (
            <div className="p-2 my-2 text-xs bg-red-400 text-white">
              {errors.email}
            </div>
          )}
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white"
          >
            {pageWords.password}
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              // autoComplete="password"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <div className="p-2 my-2 text-xs bg-red-400 text-white">
              {errors.password}
            </div>
          )}
        </div>

        {/* btn login */}
        <div className="flex justify-center">
          <button className="bg-white py-1 px-6">
            {isRequestRunning ? <Spinner /> : pageWords.login}
          </button>
        </div>

        {errors.loginError && (
          <div className="p-2 my-2 text-xs bg-red-400 text-white">
            {errors.loginError}
          </div>
        )}
      </form>

      <Link href={`register`} className="text-blue-400 underline">
        {pageWords.createAnAccount}
      </Link>
    </>
  );
};

export default FormLogin;
