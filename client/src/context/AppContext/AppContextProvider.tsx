import React, { createContext, ReactNode, useState } from "react";
import { AppContextType, RoomInfo } from "./types";
import { SocketService } from "../../services/socketService";

const socketService = new SocketService();

export const AppContext = createContext<AppContextType>({
  socketService: socketService,
  availableRoomList: [],
  handleUpdateAvailableRoomList: (_) => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [availableRoomList, setAvailableRoomList] = useState<RoomInfo[]>([]);

  const handleUpdateAvailableRoomList = (roomList: RoomInfo[]): void => {
    setAvailableRoomList(roomList);
  };

  return (
    <AppContext.Provider
      value={{
        socketService: socketService,
        availableRoomList,
        handleUpdateAvailableRoomList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
