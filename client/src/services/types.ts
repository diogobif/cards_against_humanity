export enum EventEmittersEnum {}

export enum EventListenersEnum {
  CONNECT = "connect",
  UPDATE_ROOM_LIST = "room:updateList",
}

export type Emitters = keyof typeof EventEmittersEnum;
