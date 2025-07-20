export type UserDTO = {
  id: string;
  name: string;
};

export enum UserStatusEnum {
  ONLINE = "online",
  DISCONNECTED = "disconnected",
}
