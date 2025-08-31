import React from 'react';
import styles from './style.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function PageLayout(props: React.PropsWithChildren) {
  return (
    <div className={styles.pageGrid}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
