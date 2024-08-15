/*
  I didn't handle if the user used a "username already in use" error.
*/

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
import { createNewUserAccountSocketUtil } from "@/utilities/socketClient";

const FormRegister = (props) => {
  // states
  const [isRequestRunning, setIsRequestRunning] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // translation
  const pageWords = props.registerPageWords;

  // functions
  const submitHandler = async (e) => {
    e.preventDefault();

    setErrors({
      username: "",
      email: "",
      password: "",
    });

    if (username.trim().length === 0) {
      setErrors((prev) => ({ ...prev, username: pageWords.fillInTheUsername }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }

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

    const response = await postRequest(
      `${baseUrl}/users/addNewUser`,
      JSON.stringify({
        username,
        email,
        password,
      })
    );

    const result = await response;

    setIsRequestRunning(false);

    if (result.error) {
      switch (result.message) {
        case "internalServerError":
          console.log("A web server error occurred!");
          toast.error(pageWords.internalServerError);
          break;

        case "pleaseFillInAllFields":
          console.log("switch pleaseFillInAllFields");
          toast.error(result.message);
          break;

        case "usernameAlreadyInUse":
          setErrors((prev) => {
            return { ...prev, username: pageWords.usernameAlreadyInUse };
          });
          break;

        case "invalidEmail":
          setErrors((prev) => {
            return { ...prev, email: pageWords.invalidEmail };
          });
          break;

        case "thisEmailAlreadyInUse":
          setErrors((prev) => {
            return { ...prev, email: pageWords.thisEmailAlreadyInUse };
          });
          break;

        case "invalidPassword":
          setErrors((prev) => ({
            ...prev,
            // password: response.passwordTerms.join("<br>"),
            password: [
              pageWords.PasswordMustBeAtLeast8CharactersLong,
              pageWords.oneNumber,
              pageWords.oneUppercaseLetter,
              pageWords.oneSpecialCharacter,
            ].join("<br>"),
          }));
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

    if (result.message === "accountSuccessfullyCreated") {
      console.log("[components/RegisterPage/FormRegister] result = ", result);
      const { userId, username } = result.userInfo;
      createNewUserAccountSocketUtil(userId, username);

      setUsername("");
      setEmail("");
      setPassword("");
      toast.success(pageWords.accountSuccessfullyCreated);
    }
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
            {pageWords.username}
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="username"
              value={username}
              // autoComplete="username"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              autoFocus
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
            {pageWords.email}
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
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
            {pageWords.password}
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              // autoComplete="password"
              className="p-1 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                <div dangerouslySetInnerHTML={{ __html: errors.password }} />
              </span>
            )}
          </div>
        </div>

        {/* btn register */}
        <div className="flex justify-center">
          <button className="bg-white py-1 px-6 w-[110px]">
            {isRequestRunning ? <Spinner /> : pageWords.register}
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
        {pageWords.login}
      </Link>
    </>
  );
};

export default FormRegister;
