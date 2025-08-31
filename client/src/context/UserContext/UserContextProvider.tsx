import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserContextType, UserInfoType } from "./types";
import { AppContext } from "../AppContext/AppContextProvider";

export const UserContext = createContext<UserContextType>({
  handleUserConnected: () => {},
  isConnected: false,
});

export const UsercontextProvider = ({ children }: { children: ReactNode }) => {
  const appContext = useContext(AppContext);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleUserConnected = () => {
    setUserId(appContext.socketService.getSocketId());
    setIsConnected(true);
  };

  return (
    <UserContext.Provider value={{ handleUserConnected, isConnected }}>
      {children}
    </UserContext.Provider>
  );
};
