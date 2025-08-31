import React from 'react';
import { RoomInfo } from '../../context/AppContext/types';
import { Link } from 'react-router-dom';
import { linkBuilder } from '../../routes/linkBuilder';
import styles from './style.module.css';

export function RoomCard({ room }: { room: RoomInfo }) {
  return (
    <Link className={styles.roomCard} to={linkBuilder.joinRoom(room.id)}>
      {room.name}
    </Link>
  );
}
