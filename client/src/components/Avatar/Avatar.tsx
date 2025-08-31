import React from 'react';
import styles from './style.module.css';

type Props = {
  fileUrl: string;
};

export function Avatar(props: Props) {
  return (
    <div role="avatar" className={styles.wrapper}>
      <img src={props.fileUrl} alt="Avatar" />
    </div>
  );
}
