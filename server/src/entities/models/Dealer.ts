import { INITAL_CARD_PER_PLAYER_ANMOUNT } from "../../constants/game";
import { CardTypeEnum } from "../../types/card.type";
import { getMapValuesAsArray } from "../../utils/map.utils";
import { Card } from "./Card";
import { Game } from "./Game";
import { User } from "./User";

export class Dealer {
  private _game: Game;

  constructor(game: Game) {
    this._game = game;
  }

  public shuffleCards(): void {
    const newCardList: Card[] = this._game.getCards();
    for (let i = newCardList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCardList[i], newCardList[j]] = [newCardList[j], newCardList[i]];
    }

    this._game.updateCards(newCardList);
  }

  public doInitialDeal(
    userIdList: string[],
    cardList: Card[]
  ): Map<string, Card[]> {
    const initialDealMap: Map<string, Card[]> = new Map();

    userIdList.forEach((userId: string) => {
      initialDealMap.set(userId, []);
    });

    const availableWhiteCardsList: Card[] = cardList.filter(
      (card: Card) => card.getCardType() === CardTypeEnum.WHITE
    );

    let cardSetIndexCounter: number = 0;

    userIdList.forEach((userId: string) => {
      for (
        let roundsCounter = 0;
        roundsCounter < INITAL_CARD_PER_PLAYER_ANMOUNT;
        roundsCounter++
      ) {
        const currentCard: Card = availableWhiteCardsList[cardSetIndexCounter];
        const currentUserCardSet: Card[] | undefined =
          initialDealMap.get(userId);

        if (currentUserCardSet) {
          currentUserCardSet.push(currentCard);
        }
        cardSetIndexCounter++;
      }
    });

    return initialDealMap;
  }

  private mergeGameCardsWithUsedCards(cardType: CardTypeEnum) {
    this._game.updateCards([
      ...this._game.getCards(),
      ...this._game
        .getUsedCards()
        .filter((card) => card.getCardType() === cardType),
    ]);

    this.shuffleCards();
  }

  public pickAvailableCard(cardType: CardTypeEnum): Card {
    const availableCardsList: Card[] = this._game
      .getCards()
      .filter((card: Card) => card.getCardType() === cardType);

    if (availableCardsList.length === 0) {
      this.mergeGameCardsWithUsedCards(cardType);
    }

    if (availableCardsList.length > 0) {
      const choosenCard: Card = availableCardsList[0];
      this._game.updateCards(
        this._game
          .getCards()
          .filter((card) => card.getCardId() !== choosenCard.getCardId())
      );
      return choosenCard;
    }

    throw new Error("No cards available");
  }

  public unuseCard(card: Card): void {
    this._game.updateUsedCards([...this._game.getUsedCards(), card]);
  }

  public dealCardsForNewRound() {
    getMapValuesAsArray(this._game.getPlayers()).forEach((player: User) => {
      while (player.getCurrentCards().length < INITAL_CARD_PER_PLAYER_ANMOUNT) {
        player
          .getCurrentCards()
          .push(this.pickAvailableCard(CardTypeEnum.WHITE));
      }
    });
  }
}
