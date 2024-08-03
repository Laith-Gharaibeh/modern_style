// "use client";
// // next.js
// import { useRouter } from "next/navigation";
// // utilities
// import logout from "@/utilities/logout";

// const SessionExpiredAlert = (props) => {
//   // const { lang } = props;
//   const router = useRouter();

//   return (
//     <div className="test-alert-session flex justify-center items-center test-session-alert fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
//       <div className="w-64 md:w-72 h-64 md:h-72 bg-white border-2 border-orange-500 p-4">
//         <h1 className="text-lg md:text-3xl">
//           Your session has been expired, please login again.
//         </h1>

//         <button
//           className="bg-orange-500 hover:bg-orange-400 text-white py-1 px-6"
//           onClick={() => logout("en", router)}
//         >
//           Ok
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SessionExpiredAlert;

// ================================================================

"use client";
// next.js
import { useRouter } from "next/navigation";
// utilities
import logout from "@/utilities/logout";

const SessionExpiredAlert = (props) => {
  const router = useRouter();
  const lang = "en"; // Assuming lang is always "en" for this example

  const handleLogout = async () => {
    await logout(lang);
  };

  return (
    <div className="test-alert-session flex justify-center items-center test-session-alert fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="w-64 md:w-72 h-64 md:h-72 bg-white border-2 border-orange-500 p-4">
        <h1 className="text-lg md:text-3xl">
          Your session has been expired, please login again.
        </h1>

        <button
          className="bg-orange-500 hover:bg-orange-400 text-white py-1 px-6"
          onClick={handleLogout}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredAlert;
