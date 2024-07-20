"use client";
// next-auth
import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return (
    // <SessionProvider session={undefined} refetchInterval={0}></SessionProvider>
    <SessionProvider>{children}</SessionProvider>
  );
};
