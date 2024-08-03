"use client";
// next.js
import { useRouter } from "next/navigation";
// react.js
import { useState, useContext } from "react";
import { RefreshTokenContext } from "@/app/[lang]/Providers";
// packages
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
// utilities
import { baseUrl, postRequest } from "@/utilities/postRequest";
// components
import Spinner from "@/components/Spinner";
import { useSessionContext } from "@/app/[lang]/Providers";

const FormChangePassword = (props) => {
  // console.log("[FormChangePassword.jsx] props = ", props);
  const { lang } = props;
  const { data: session } = useSession();
  // const { setIsSessionExpired } = useSessionContext();
  const { setIsRefreshTokenExpired } = useContext(RefreshTokenContext);

  // states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRequestRunning, setIsRequestRunning] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  // translation
  const {
    changePassword,
    passwordWord,
    confirmPasswordWord,
    fillInPassword,
    fillInConfirmPassword,
    PasswordMustBeAtLeast8CharactersLong,
    oneNumber,
    oneUppercaseLetter,
    oneSpecialCharacter,
    confirmPasswordDoesNotMatchPassword,
    passwordChangedSuccessfully,
    sessionExpiredLoginAgain,
    internalServerError,
    change,
  } = props.pageWords;

  // functions
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHandler change password...");

    setErrors({
      password: "",
      confirmPassword: "",
    });

    if (password.length === 0) {
      setErrors((prev) => ({ ...prev, password: fillInPassword }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (confirmPassword.length === 0) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: fillInConfirmPassword,
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }

    setIsRequestRunning(true);

    const response = await postRequest(
      `${baseUrl}/users/changePassword`,
      JSON.stringify({
        userId: session.user.id,
        password,
        confirmPassword,
      }),
      {},
      "include"
    );

    // const response = await fetch(`${baseUrl}/users/changePassword`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     password,
    //     confirmPassword,
    //   }),
    //   credentials: "include",
    // });
    // ===================================================
    // const result = await response.json();

    // console.log("result = ", result);

    setIsRequestRunning(false);
    console.log("[FormChangePassword.jsx] response  = ", response);

    if (response.message === "internalServerError") {
      toast.error(internalServerError);
      return;
    } else if (response.message === "JWTExpired") {
      // toast.error(response.message);
      // const refreshTokenResponse = await postRequest(
      //   `${baseUrl}/users/refreshToken`,
      //   JSON.stringify({
      //     userId: session.user.id,
      //   }),
      //   {},
      //   "include"
      // );
      // console.log(
      //   "From refreshToken endpoint refreshTokenResponse = ",
      //   refreshTokenResponse
      // );
      // if (refreshTokenResponse.newAccessToken) {
      //   Cookies.set("accessToken", refreshTokenResponse.newAccessToken);
      //   // cookies().set({
      //   //   name: "accessToken",
      //   //   value: refreshTokenResponse.newAccessToken,
      //   // });
      // }
      // return;
    } else if (response.message === "pleaseFillInAllFields") {
      setErrors({
        password: fillInPassword,
        confirmPassword: fillInConfirmPassword,
      });
      return;
    } else if (response.message === "invalidPassword") {
      setErrors((prev) => ({
        ...prev,
        // password: response.passwordTerms.join("<br>"),
        password: [
          PasswordMustBeAtLeast8CharactersLong,
          oneNumber,
          oneUppercaseLetter,
          oneSpecialCharacter,
        ].join("<br>"),
      }));
      return;
    } else if (response.message === "confirmPasswordDoesNotMatchPassword") {
      setErrors({
        confirmPassword: confirmPasswordDoesNotMatchPassword,
      });
      return;
    } else if (response.message === "sessionExpiredLoginAgain") {
      console.log("response.message = ", response.message);
      setIsRefreshTokenExpired(true);
      return;
    } else if (response.message === "passwordChangedSuccessfully") {
      toast.success(passwordChangedSuccessfully);
      return;
    }
  };

  return (
    <div className="my-4">
      <h4>{changePassword}</h4>
      <form onSubmit={submitHandler}>
        {/* password */}
        <div className="my-2 w-full sm:w-1/3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6"
          >
            {passwordWord}
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              // autoComplete="password"
              className="p-1 block border-0 py-1.5 w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {errors.password && (
              <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                {errors.password}
              </span>
            )} */}
            {errors.password && (
              <span className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                <div dangerouslySetInnerHTML={{ __html: errors.password }} />
              </span>
            )}
          </div>
        </div>

        {/* confirm password */}
        <div className="my-2 w-full sm:w-1/3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6"
          >
            {confirmPasswordWord}
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="password"
              type="password"
              // autoComplete="password"
              className="p-1 block border-0 py-1.5 w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <div className="inline-block px-1 md:py-2 mt-2 bg-red-400 text-white">
                {errors.confirmPassword}
              </div>
            )}
          </div>
        </div>

        {/* btn change */}
        <div className="flex">
          <button
            className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-6 w-[110px]"
            disabled={isRequestRunning}
          >
            {isRequestRunning ? <Spinner /> : change}
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
    </div>
  );
};

export default FormChangePassword;
