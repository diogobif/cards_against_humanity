import React, { useContext } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { UserContext } from '../../context/UserContext/UserContextProvider';
import { Login } from '../../components/Login';
import { RoomList } from '../../components/RoomList';

export function Home() {
  const { isUserInfoComplete } = useContext(UserContext);

  return (
    <PageLayout>{isUserInfoComplete ? <RoomList /> : <Login />}</PageLayout>
  );
}
