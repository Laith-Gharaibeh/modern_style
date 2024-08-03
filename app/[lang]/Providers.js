"use client";
// next-auth
import { SessionProvider, signOut } from "next-auth/react";
import React, { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import SessionExpiredAlert from "@/components/alerts/SessionExpiredAlert";
// auth provider
export const AuthProvider = ({ children }) => {
  return (
    // <SessionProvider session={undefined} refetchInterval={0}></SessionProvider>
    <SessionProvider>{children}</SessionProvider>
  );
};

// refresh token provider
export const RefreshTokenContext = createContext();

export const RefreshTokenProvider = (props) => {
  console.log("[Providers.js] RefreshTokenProvider");
  const { lang, children } = props;
  const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: `/${lang}/login`,
      redirect: false,
    });

    setIsRefreshTokenExpired(false);

    router.replace(`/${lang}/login`);
  };

  return (
    <RefreshTokenContext.Provider
      value={{
        isRefreshTokenExpired,
        setIsRefreshTokenExpired,
        handleLogout,
      }}
    >
      <React.Fragment>
        {children}
        {isRefreshTokenExpired && (
          <SessionExpiredAlert handleLogout={handleLogout} />
        )}
      </React.Fragment>
    </RefreshTokenContext.Provider>
  );
};
