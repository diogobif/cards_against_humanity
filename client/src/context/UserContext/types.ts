import { LoginFormData } from '../../components/Login/LoginForm/types';

export type UserInfoType = {
  name: string | null;
  id: string;
  avatar: string | null;
};

export type UserContextType = {
  handleUserConnected: () => void;
  isConnected: boolean;
  userInfo: UserInfoType | null;
  handleUpdateUserInfo: (data: LoginFormData) => void;
  isUserInfoComplete: boolean;
};
