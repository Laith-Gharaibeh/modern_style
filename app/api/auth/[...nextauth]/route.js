/* question:
  I am working on a Next.js, Node.js, and MYSQL project, I have to separate projects, one for the admin, and the second one is the main website.

  On the main website I am working on the login process using NextAuth, my question is,
  how can I manage the login process?
  do I have to create an API endpoint on the admin part for login and manage everything there?
  or on the main website project I have to install the MYSQL package and manage everything on the main website?
*/

/*
  execution steps in authOptions:
  1- providers => async authorize()
  2- callbacks => async jwt()
  3- callbacks => async session()
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
              body: JSON.stringify({ email, password }),
            }
          );

          user = await response.json();

          if (user?.error) {
            return null;
          }

          const setCookieHeader = response.headers.get("Set-Cookie");

          if (setCookieHeader) {
            // Split the Set-Cookie header by commas, but only at the start of new cookie definitions
            const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);
            const cookiesAPI = cookiesArray.map((cookie) => {
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

            // set cookies in the browser
            cookiesAPI.forEach((cookie) => {
              cookies().set({
                name: cookie.name,
                value: cookie.value,
                httpOnly: cookie.attributes.includes("HttpOnly"),
              });
            });
          }

          return {
            ...user.user,
            id: user.user.id,
            name: user.user.username,
          };
        } catch (error) {
          console.log("[api/auth/[...nextauth] error = ", error);
          return error;
        }
      },
    }),
  ],

  callbacks: {
    // after a user is authorized successfully, these two callbacks are made:
    async jwt({ token, user }) {
      // async jwt({ token, user }) => I can add what I want to the token
      // async jwt({ token, user }) => I can change the exp time
      // Include user id and role in the JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // token.apiToken = user.userToken;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      // Send user id and role to the client
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    jwt: {
      async encode(data) {
        // Include user ID and role in the JWT payload
        // async encode(data) => this function is called when a user is authenticated, and it generates a JWT token based on the user's data.
        const { user, ...rest } = data;
        const updatedData = {
          ...rest,
          userId: user.id,
          role: user.role,
        };

        return jwt.sign(updatedData, process.env.NEXTAUTH_SECRET, {
          algorithm: "HS256",
        });
      },
      async decode(token) {
        // The decode function takes a JWT token as an input and verifies it using the jwt.verify function.
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET, {
          algorithms: ["HS256"],
        });

        return {
          ...decoded,
          // Add the user object from the decoded token
          user: {
            id: decoded.userId,
            role: decoded.role,
          },
        };
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "../../../[lang]/login/page.jsx",
  },

  events: {
    async signIn(message) {
      /* on successful sign in */
      console.log("events signIn() message = ", message);
    },
    async signOut(message) {
      //   /* on signout */
      console.log("events: signOut() message = ", message);
      //   cookies().delete("next-auth.session-token");
      //   // cookies().delete("next-auth.callback-url");
      //   // cookies().delete("next-auth.csrf-token");
      //   cookies().delete("JWT");
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
