import { useContext, useEffect } from 'react';
import { EventListenersEnum } from '../services/types';
import { UserContext } from '../context/UserContext/UserContextProvider';
import { AppContext } from '../context/AppContext/AppContextProvider';

export function useHandleConnection() {
  const userContext = useContext(UserContext);
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.socketService.on(
      EventListenersEnum.CONNECT,
      userContext.handleUserConnected,
    );

    appContext.socketService.on(EventListenersEnum.UPDATE_ROOM_LIST, roomData =>
      appContext.handleUpdateAvailableRoomList(roomData),
    );
  }, [userContext, appContext]);
}
