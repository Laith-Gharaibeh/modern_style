// "use client";
// // next
// // import { useRouter } from "next/navigation";
// // NextAuth
// import { signOut } from "next-auth/react";

// export default async function logout(lang, router) {
//   // const router = useRouter();

//   await signOut({
//     callbackUrl: `/${lang}`,
//     redirect: false,
//   }).then(() => {
//     router.replace("/" + lang);
//   });
// }

// -------------------------------------------------------

import { signOut } from "next-auth/react";

export default async function logout(lang) {
  await signOut({
    callbackUrl: `/${lang}/login`,
    redirect: false,
  });
}
