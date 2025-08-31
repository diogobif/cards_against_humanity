import React, { useContext } from 'react';
import { LoginForm } from './LoginForm';
import { UserContext } from '../../context/UserContext/UserContextProvider';

export function Login() {
  const { handleUpdateUserInfo } = useContext(UserContext);
  return <LoginForm handleSubmitData={handleUpdateUserInfo} />;
}
