import { SocketService } from "../../services/socketService";

export type RoomInfo = {
  name: string;
  id: string;
};

export type AppContextType = {
  socketService: SocketService;
  availableRoomList: RoomInfo[];
  handleUpdateAvailableRoomList: (availableRooms: RoomInfo[]) => void;
};
