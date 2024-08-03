// next.js
import { cookies } from "next/headers";
// next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// utilities
import { baseUrl, getRequest } from "@/utilities/getRequest";
import { getDictionary } from "@/utilities/dictionary";

// components
import FormChangePassword from "@/components/userProfilePage/FormChangePassword";

// async function fetchUserProfile() {
//   const cookieStore = cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;

//   // console.log("[UserProfilePage] accessToken = ", accessToken);

//   const response = await fetch("http://localhost:3000/api/users/userProfile", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//       Origin: "http://localhost:3001",
//     },
//     credentials: "include",
//   });
//   const result = await response.json();

//   // console.log("[UserProfilePage] result = ", result);
//   // console.log("[UserProfilePage] response.ok = ", response.ok);

//   // if (!response.ok) {
//   //   throw new Error("Failed to fetch user profile");
//   // }

//   // console.log("[UserProfilePage] fetchUserInfo result = ", result);

//   return result;
// }

const UserProfilePage = async (props) => {
  const { lang } = props.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/" + lang);
  }

  // translation
  // let pageWords = await getDictionary(lang);
  // pageWords = pageWords.pages.userProfile;

  const pageWords = await getDictionary(lang).then((words) => {
    const pageWords = words.pages.userProfile;

    return pageWords;
  });

  // functions
  const fetchUserProfile = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      "http://localhost:3000/api/users/userProfile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Origin: "http://localhost:3001",
        },
        credentials: "include",
      }
    );
    const result = await response.json();

    console.log("[userProfilePage.jsx] fetchUserProfile() result = ", result);

    return result;
  };

  const userInfo = await fetchUserProfile();

  return (
    <section>
      <div className="container py-2">
        <h1>{pageWords.myProfile}</h1>
        <p>
          {pageWords.username}: {userInfo.username}
        </p>
        <p>
          {pageWords.email}: {userInfo.email}
        </p>

        <FormChangePassword pageWords={pageWords} lang={lang} />
      </div>
    </section>
  );
};

export default UserProfilePage;
