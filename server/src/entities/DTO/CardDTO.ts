import { CardTypeEnum } from "../../types/card.type";

export type CardDTO = {
  id: string;
  content: string;
  type: CardTypeEnum;
};
