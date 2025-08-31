import React from 'react';
import { useHandleConnection } from '../../hooks/useHandleConnection';
import styles from './style.module.css';
import { Header } from '../Header';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';

export function App() {
  const element = useRoutes(routes);
  useHandleConnection();

  return (
    <div className={`${styles.appContainer}`}>
      <div className={`${styles.appGrid}`}>{element}</div>
    </div>
  );
}
