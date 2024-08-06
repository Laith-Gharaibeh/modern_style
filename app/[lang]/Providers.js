"use client";
// next-auth
import { SessionProvider, signOut } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// imports for RefreshTokenProvider
import SessionExpiredAlert from "@/components/alerts/SessionExpiredAlert";

// imports for SocketProvider
import { io } from "socket.io-client";

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
    console.log("[Providers.jsx] logout");

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

// socket provider
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [socketSession, setSocketSession] = useState(null);

  useEffect(() => {
    if (isUserLogin) {
      setSocket(io("http://localhost:5000"));
    }
  }, [isUserLogin]);

  useEffect(() => {
    // if (isUserLogin) {
    if (socket) {
      // socket.emit("newUser", session.user.name);
      // socket.emit("new online user, userId = ", userId);
      // socket.emit("newUser", userId);
      socket.emit("newUser", socketSession.user.id);
      console.log("socket = ", socket);
      console.log("socketSession = ", socketSession);
    }
  }, [socket]);

  const getUserId = (userId) => {
    setUserId(userId);
  };

  return (
    <SocketContext.Provider
      value={{ socket, setIsUserLogin, setSocketSession, getUserId }}
    >
      {children}
    </SocketContext.Provider>
  );
};
