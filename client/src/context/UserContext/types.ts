export type UserInfoType = {
  name: string;
  id: string;
  avatar: string;
};

export type UserContextType = {
  handleUserConnected: () => void;
  isConnected: boolean;
};
