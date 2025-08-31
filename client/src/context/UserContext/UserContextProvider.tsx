import React, { ReactNode, createContext, useContext, useState } from 'react';
import { UserContextType, UserInfoType } from './types';
import { AppContext } from '../AppContext/AppContextProvider';
import { LoginFormData } from '../../components/Login/LoginForm/types';

export const UserContext = createContext<UserContextType>({
  handleUserConnected: () => {
    throw new Error('handleUserConnected not implemented');
  },
  isConnected: false,
  userInfo: null,
  handleUpdateUserInfo: (data: LoginFormData) => {
    throw new Error('handleUserConnected not implemented');
  },
  isUserInfoComplete: false,
});

export const UsercontextProvider = ({ children }: { children: ReactNode }) => {
  const appContext = useContext(AppContext);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [isUserInfoComplete, setIsUserInfoComplete] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(!!userInfo?.id);

  const handleUserConnected = (): void => {
    setUserInfo({
      id: appContext.socketService.getSocketId(),
      name: userInfo?.name ?? null,
      avatar: userInfo?.avatar ?? null,
    });

    setIsConnected(true);
  };

  const handleUpdateUserInfo = (data: LoginFormData): void => {
    if (userInfo?.id) {
      setUserInfo({
        id: userInfo.id,
        avatar: data.avatarSrc,
        name: data.name,
      });
      setIsUserInfoComplete(true);
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleUserConnected,
        isConnected,
        userInfo,
        handleUpdateUserInfo,
        isUserInfoComplete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
