/* question:
  I am working on a Next.js, Node.js, and MYSQL project, I have to separate projects, one for the admin, and the second one is the main website.

  On the main website I am working on the login process using NextAuth, my question is,
  how can I manage the login process?
  do I have to create an API endpoint on the admin part for login and manage everything there?
  or on the main website project I have to install the MYSQL package and manage everything on the main website?
*/

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { pool } from "@/utilities/backend/database/mysql";
// import { cookies } from "next/headers";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         try {
//           const { email, password } = credentials;

//           let user = null;

//           const response = await fetch(
//             "http://localhost:3000/api/users/loginUser",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(credentials),
//             }
//           );
//           user = await response.json();

//           console.log("[api/auth/[...nextauth] user = ", user);
//           // const responseCookies = response.headers.get("Set-Cookie");
//           // console.log(
//           //   "[api/auth/[...nextauth] responseCookies = ",
//           //   responseCookies
//           // );
//           // const responseCookies = response.headers.get("Set-Cookie");
//           // console.log(
//           //   "[api/auth/[...nextauth] responseCookies = ",
//           //   responseCookies
//           // );

//           const responseCookies = response.headers.get("Set-Cookie");

//           console.log(
//             'responseCookies.split(";") = ',
//             responseCookies.split(";")
//           );

//           const jwtCookie = responseCookies.split(";")[0].trim().split("=")[1];
//           const newUserCookie = responseCookies
//             .split(";")[1]
//             .trim()
//             .split("=")[1];

//           console.log("jwtCookie = ", jwtCookie);
//           console.log("newUserCookie = ", newUserCookie);

//           if (user?.error) {
//             return null;
//           }

//           // cookies().set({
//           //   name: "connect.sid",
//           //   // value: sessionIdCookie,
//           //   value: responseCookies,
//           //   httpOnly: true,
//           //   // secure: true,
//           // });

//           // let cookies = {};

//           // if (responseCookies) {
//           //   const cookieArray = responseCookies.split(", ");
//           //   cookieArray.forEach((cookie) => {
//           //     const [key, value] = cookie.split("; ")[0].split("=");
//           //     cookies[key] = value;
//           //   });
//           // }

//           // user = await response.json();
//           // console.log("[api/auth/[...nextauth] user = ", user);
//           // console.log("[api/auth/[...nextauth] cookies = ", cookies);

//           // const userData = {
//           //   id: user.id,
//           //   email: user.email,
//           //   username: user.username,
//           //   role: user.role,
//           // };

//           // const jwtToken = cookies.JWT;

//           // return { ...userData, jwtToken };

//           // ==========================================
//           // return null;

//           // user = {
//           //   id: 1000,
//           //   email: "test@mail.com",
//           //   username: "test username",
//           //   role: "test user role",
//           // };

//           return user;
//           // return {
//           //   ...user,
//           //   headers: {
//           //     "Set-Cookie": responseCookies,
//           //   },
//           // };
//         } catch (error) {
//           console.log("[api/auth/[...nextauth] error = ", error);
//           return error;
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     jwt: {
//       async encode(data) {
//         console.log(
//           "[...nextauth]/route.js session:jwt: encode() data = ",
//           data
//         );
//         // Include user ID and role in the JWT payload
//         // async encode(data) => this function is called when a user is authenticated, and it generates a JWT token based on the user's data.
//         const { user, ...rest } = data;
//         const updatedData = {
//           ...rest,
//           userId: user.id,
//           role: user.role,
//         };

//         return jwt.sign(updatedData, process.env.NEXTAUTH_SECRET, {
//           algorithm: "HS256",
//         });
//       },
//       async decode(token) {
//         console.log(
//           "[...nextauth]/route.js session:jwt: decode() token = ",
//           token
//         );
//         // The decode function takes a JWT token as an input and verifies it using the jwt.verify function.
//         const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET, {
//           algorithms: ["HS256"],
//         });

//         return {
//           ...decoded,
//           // Add the user object from the decoded token
//           user: {
//             id: decoded.userId,
//             role: decoded.role,
//           },
//         };
//       },
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "../../../[lang]/login/page.jsx",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       // console.log(
//       //   "*************** start callbacks: session ***********************"
//       // );
//       // console.log(
//       //   "[...nextauth]/route.js callbacks: session() session = ",
//       //   session
//       // );
//       // console.log(
//       //   "[...nextauth]/route.js callbacks: session() token = ",
//       //   token
//       // );
//       // console.log(
//       //   "*************** // end callbacks: session ***********************"
//       // );
//       // Send user id and role to the client
//       session.user.id = token.id;
//       session.user.role = token.role;
//       // console.log("[callbacks] session = ", session);
//       return session;
//     },
//     async jwt({ token, user }) {
//       // console.log(
//       //   "================== start callbacks: jwt ======================="
//       // );
//       // console.log("[...nextauth]/route.js callbacks: jwt() token = ", token);
//       // // callbacks: jwt() user => this will be have data only when login the admin, in other requests it will be "undefined"
//       // console.log("[...nextauth]/route.js callbacks: jwt() user = ", user);
//       // console.log(
//       //   "================== // end callbacks: jwt ======================="
//       // );
//       // Include user id and role in the JWT token
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       // console.log("[JWT] callback token = ", token);
//       // console.log("[JWT] callback user = ", user);
//       return token;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// ======================================================================

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/utilities/backend/database/mysql";
import { cookies } from "next/headers";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req, res) {
        try {
          const { email, password } = credentials;

          let user = null;

          const response = await fetch(
            "http://localhost:3000/api/users/loginUser",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );
          user = await response.json();

          // ---------------------------------------

          // const cookies = response.headers.get("Set-Cookie");
          // console.log("cookies = ", cookies);
          const setCookieHeader = response.headers.get("Set-Cookie");
          if (setCookieHeader) {
            // Split the Set-Cookie header by commas, but only at the start of new cookie definitions
            const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);
            const cookies = cookiesArray.map((cookie) => {
              const [cookiePair, ...attributes] = cookie.split(";");
              const [name, value] = cookiePair
                .split("=")
                .map((part) => part.trim());
              return {
                name,
                value,
                attributes: attributes.map((attr) => attr.trim()),
              };
            });

            // Set the cookies on the response
            // cookies.forEach((cookie) => {
            //   res.setHeader(
            //     "Set-Cookie",
            //     `${cookie.name}=${cookie.value}; ${cookie.attributes.join(
            //       "; "
            //     )}`
            //   );
            // });
            // console.log("[api/auth/[...nextauth] cookies = ", cookies); // This will give you an array of cookie objects
            // res.setHeader("Set-Cookie", cookies);
          }

          // ---------------------------------------

          if (user?.error) {
            return null;
          }
          return {
            ...user.user,
            id: user.user.id,
            // username: user.user.username,
            name: user.user.username,
            testMsg: "test msg",
          };

          // return {};
        } catch (error) {
          console.log("[api/auth/[...nextauth] error = ", error);
          return error;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    jwt: {
      async encode(data) {
        console.log("-------------------------------------");
        console.log("=> () session:jwt encode data = ", data);
        // return data;
        return null;

        // Include user ID and role in the JWT payload
        // async encode(data) => this function is called when a user is authenticated, and it generates a JWT token based on the user's data.
        // const { user, ...rest } = data;
        // const updatedData = {
        //   ...rest,
        //   userId: user.id,
        //   role: user.role,
        // };

        // return jwt.sign(updatedData, process.env.NEXTAUTH_SECRET, {
        //   algorithm: "HS256",
        // });
      },
      async decode(token) {
        console.log("=> () session:jwt decode token = ", token);
        console.log("-------------------------------------");
        return null;
        // // The decode function takes a JWT token as an input and verifies it using the jwt.verify function.
        // const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET, {
        //   algorithms: ["HS256"],
        // });

        // return {
        //   ...decoded,
        //   // Add the user object from the decoded token
        //   user: {
        //     id: decoded.userId,
        //     role: decoded.role,
        //   },
        // };
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "../../../[lang]/login/page.jsx",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("-------------------------------------");
      console.log("=> (3) callbacks:session session = ", session);
      console.log("=> (4) callbacks:session token = ", token);
      console.log("-------------------------------------");

      return {};
      // Send user id and role to the client
      session.user.id = token.id;
      session.user.role = token.role;
      // console.log("[callbacks] session = ", session);
      return session;
    },
    async jwt({ token, user }) {
      // Include user id and role in the JWT token
      return {};
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
