import { connect } from 'socket.io-client';
import { Emitters, EventEmittersEnum, EventListenersEnum } from './types';

export class SocketService {
  private _socket: SocketIOClient.Socket;

  constructor() {
    try {
      this._socket = connect('http://localhost:3001');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getSocketId(): string {
    return this._socket.id;
  }

  disconnect(callback?: () => void) {
    try {
      this._socket.disconnect();

      if (callback) {
        callback();
      }
      console.log('Socket.io disconected');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  emit(emitAction: Emitters, payload: any) {
    this._socket.emit(EventEmittersEnum[emitAction], payload);
  }

  on(listenAction: EventListenersEnum, callback: (data?: any) => void) {
    this._socket.on(`${listenAction}`, callback);
  }
}
