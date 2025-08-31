import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext/AppContextProvider';
import styles from './style.module.css';
import { RoomInfo } from '../../context/AppContext/types';
import { RoomCard } from '../RoomCard';

export function RoomList() {
  const { availableRoomList } = useContext(AppContext);
  return (
    <div className={styles.GridContainer}>
      <h1>Available Rooms:</h1>

      <div className={styles.RoomItemsContainer}>
        {availableRoomList.map((room: RoomInfo) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
}
