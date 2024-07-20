"use client";
// Next.js
import Link from "next/link";
import { useRouter } from "next/navigation";
// React.js
import { useState } from "react";
// packages
import toast, { Toaster } from "react-hot-toast";
// utilities
import { baseUrl, postRequest } from "@/utilities/postRequest";
// components
import Spinner from "@/components/Spinner";

const FormRegister = (props) => {
  // console.log("[FormRegister.jsx] props = ", props);
  const { lang } = props;

  const [isRequestRunning, setIsRequestRunning] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const router = useRouter();

  // functions
  const submitHandler = async (e) => {
    e.preventDefault();

    setErrors({
      username: "",
      email: "",
      password: "",
    });

    // console.log("[FormRegister.js] submitHandler...");

    // console.log("[FormRegister.js] username = ", username);
    // console.log("[FormRegister.js] email = ", email);
    // console.log("[FormRegister.js] password = ", password);

    setIsRequestRunning(true);

    const response = await postRequest(
      `${baseUrl}/users/addNewUser`,
      JSON.stringify({
        username,
        email,
        password,
      })
    );
    const result = await response;

    console.log("result.error = ", result.error);

    if (result.error) {
      switch (result.message) {
        case "internalServerError":
          console.log("A web server error occurred!");
          toast.error(result.message);
          break;

        case "pleaseFillInAllFields":
          console.log("switch pleaseFillInAllFields");
          toast.error(result.message);
          break;

        case "invalidEmail":
          console.log("switch invalidEmail");
          toast.error(result.message);
          break;

        case "invalidPassword":
          console.log("switch password");
          toast.error(result.message);
          break;
        case "checkYourEmailToActivateYourAccount":
          console.log("Check your email to activate your account");
          toast.success(result.message);
          break;

        default:
          toast.error(result.message);
          break;
      }
    }
    console.log("[FormRegister.jsx] result = ", result);

    setIsRequestRunning(false);
  };

  return (
    <>
      <form
        className="relative w-full max-w-sm px-[10px] py-[40px] bg-orange-400"
        onSubmit={submitHandler}
      >
        {/* username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-white"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="username"
              // autoComplete="username"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && (
            <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
              {errors.username}
            </span>
          )}
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              // autoComplete="email"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white"
          >
            Password
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
            {errors.password && (
              <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                {errors.password}
              </span>
            )}
          </div>
        </div>

        {/* btn register */}
        <div className="flex justify-center">
          <button className="bg-white py-1 px-6 w-[110px]">
            {isRequestRunning ? <Spinner /> : "Register"}
          </button>
        </div>

        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              textAlign: "center",
            },
          }}
        />
      </form>

      <Link href={`login`} className="text-blue-400 underline ">
        Login
      </Link>
    </>
  );
};

export default FormRegister;
