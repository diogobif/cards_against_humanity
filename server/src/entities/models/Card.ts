import { CardTypeEnum } from "../../types/card.type";
import { CardDTO } from "../DTO/CardDTO";
import { CARD_DISPLAY_QUESTION_SYMBOL } from "../../constants/card";

export class Card {
  private _id: string;
  private _content: string;
  private _type: CardTypeEnum;

  constructor(data: CardDTO) {
    this._content = data.content;
    this._id = data.id;
    this._type = data.type;
  }

  public displayContent(): string {
    return this._content;
  }

  public getCardType(): CardTypeEnum {
    return this._type;
  }

  public getCardId(): string {
    return this._id;
  }
}
