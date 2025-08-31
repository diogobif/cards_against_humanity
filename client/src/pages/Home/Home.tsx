import React, { useContext } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { UserContext } from '../../context/UserContext/UserContextProvider';
import { Login } from '../../components/Login';

export function Home() {
  const { isUserInfoComplete } = useContext(UserContext);

  return (
    <PageLayout>
      {isUserInfoComplete ? <span>home</span> : <Login />}
    </PageLayout>
  );
}
