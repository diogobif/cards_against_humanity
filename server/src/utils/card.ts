import { CardDTO } from "../entities/DTO/CardDTO";
import { Card } from "../entities/models/Card";

export const createCardSet = (cardList: CardDTO[]): Card[] => {
  return cardList.map((card: CardDTO) => new Card(card));
};
