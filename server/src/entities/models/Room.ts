import { User } from "./User";

export class Room {
  private _users: Map<string, User>;
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._users = new Map<string, User>();
    this._id = id;
    this._name = name;
  }

  public connectUser(user: User) {
    this._users.set(user.getId(), user);
    user.updateRoomId(this._id);
  }

  public getUsers(): Map<string, User> {
    return this._users;
  }

  public getRoomId(): string {
    return this._id;
  }

  public getBasicInfo() {
    return {
      name: this._name,
      id: this._id,
    };
  }
}
