import { UserDTO, UserStatusEnum } from "../DTO/UserDTO";
import { Card } from "./Card";

export class User {
  private _id: string;
  private _name: string;
  private _status: UserStatusEnum;
  private _roomId: string | null;
  private _currentCards: Card[];

  constructor(data: UserDTO) {
    this._id = data.id;
    this._name = data.name;
    this._status = UserStatusEnum.ONLINE;
    this._roomId = null;
    this._currentCards = [];
  }

  public getId(): string {
    return this._id;
  }

  public updateCurrentCards(cards: Card[]) {
    this._currentCards = cards;
  }

  public updateRoomId(roomId: string): void {
    this._roomId = roomId;
  }

  public getCurrentCards(): Card[] {
    return this._currentCards;
  }

  public chooseCard(cardId: string): Card {
    const choosenCard: Card | undefined = this._currentCards.find(
      (card: Card) => card.getCardId() === cardId
    );
    if (!choosenCard) {
      throw new Error("Card not found");
    }
    this._currentCards = this._currentCards.filter(
      (card) => card.getCardId() !== cardId
    );

    return choosenCard;
  }
}
