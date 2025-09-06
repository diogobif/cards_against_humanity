import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContextProvider';
import { AppContext } from '../../context/AppContext/AppContextProvider';

export function useHandleJoinRoom() {
  const userContext = useContext(UserContext);
  const appContext = useContext(AppContext);
}
