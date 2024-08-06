// utilities
import { getDictionary } from "@/utilities/dictionary";
// providers
// import { AuthProvider } from "@/app/[lang]/Providers";
import {
  AuthProvider,
  ExpiredRefreshTokenProvider,
  RefreshTokenProvider,
  SocketProvider,
} from "./Providers";
// components
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
// css
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }) {
  const { lang } = params;
  const pageDirection = lang === "en" ? "ltr" : "rtl";

  // translation
  let navbarWords = await getDictionary(lang);
  navbarWords = navbarWords.components.navbar;

  return (
    <html lang={lang} dir={pageDirection}>
      {/* <ExpiredRefreshTokenProvider> */}
      <AuthProvider>
        <body>
          <RefreshTokenProvider lang={lang}>
            <SocketProvider>
              <Navbar lang={lang} navbarWords={navbarWords} />

              <main>{children}</main>

              <Footer />
            </SocketProvider>
          </RefreshTokenProvider>
        </body>
      </AuthProvider>
      {/* </ExpiredRefreshTokenProvider> */}
    </html>
  );
}

// ============================================================
// layout.js
// import { getDictionary } from "@/utilities/dictionary";
// import { AuthProvider } from "./Providers";
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer";
// import "./globals.css";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default async function RootLayout({ children, params }) {
//   const { lang } = params;
//   const pageDirection = lang === "en" ? "ltr" : "rtl";

//   // translation
//   let navbarWords = await getDictionary(lang);
//   navbarWords = navbarWords.components.navbar;

//   return (
//     <html lang={lang} dir={pageDirection}>
//       <AuthProvider>
//         <body>
//           <Navbar lang={lang} navbarWords={navbarWords} />
//           <main>{children}</main>
//           <Footer />
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }

// ============================================================

// // layout.js
// import { getDictionary } from "@/utilities/dictionary";
// import { AuthProvider } from "./Providers"; // Import AuthProvider
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer";
// import "./globals.css";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default async function RootLayout({ children, params }) {
//   const { lang } = params;
//   const pageDirection = lang === "en" ? "ltr" : "rtl";

//   // translation
//   let navbarWords = await getDictionary(lang);
//   navbarWords = navbarWords.components.navbar;

//   return (
//     <html lang={lang} dir={pageDirection}>
//       <AuthProvider>
//         <body>
//           <Navbar lang={lang} navbarWords={navbarWords} />

//           <main>{children}</main>

//           <Footer />
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }
