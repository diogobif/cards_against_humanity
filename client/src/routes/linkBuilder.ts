import { RoutesEnum } from './routes';
import { generatePath } from 'react-router-dom';

export class linkBuilder {
  public static joinRoom(roomId: string) {
    return generatePath(RoutesEnum.JOIN_ROOM, {
      roomId: roomId,
    });
  }
}
