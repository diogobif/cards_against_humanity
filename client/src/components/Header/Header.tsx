import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContextProvider';
import { ConnectedHeader } from './ConnectedHeader/ConnectedHeader';
import { NotConnectedHeader } from './NotConnectedHeader/NotConnectedHeader';
import styles from './style.module.css';

export function Header() {
  const { isConnected } = useContext(UserContext);
  return (
    <div className={styles.container}>
      {isConnected ? <ConnectedHeader /> : <NotConnectedHeader />}
    </div>
  );
}
