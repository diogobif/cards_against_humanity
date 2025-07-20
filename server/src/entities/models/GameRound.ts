import { CARD_DISPLAY_QUESTION_SYMBOL } from "../../constants/card";
import { CardTypeEnum } from "../../types/card.type";
import { GameStatusEnum } from "../../types/game.type";
import { Card } from "./Card";
import { Dealer } from "./Dealer";
import { Game } from "./Game";
import { User } from "./User";

export class GameRound {
  private _blackCard: Card;
  private _whiteCardList: Map<string, Card>;
  private _winner: User | null;
  private _game: Game;
  private _mainPlayer: User;

  constructor(game: Game, mainPlayer: User) {
    this._game = game;
    this._blackCard = this._game
      .getDealer()
      .pickAvailableCard(CardTypeEnum.BLACK);
    this._game.getDealer().unuseCard(this._blackCard);
    this._whiteCardList = new Map<string, Card>();
    this._winner = null;
    this._mainPlayer = mainPlayer;
    this._game.getDealer().dealCardsForNewRound();
  }

  public getCardFromUser(user: User, card: Card): void {
    const isUserAlredySentCard: boolean = !!this._whiteCardList.get(
      user.getId()
    );

    if (isUserAlredySentCard) {
      throw new Error("User already selected a white card");
    }

    const isUserMainPlayer: boolean = user.getId() === this._mainPlayer.getId();
    if (isUserMainPlayer) {
      throw new Error("Main player cannot send white cards");
    }

    if (card.getCardType() !== CardTypeEnum.WHITE) {
      throw new Error("Players can only send white cards");
    }

    this._whiteCardList.set(user.getId(), card);
    this._game.getDealer().unuseCard(card);

    if (
      Array.from(this._whiteCardList.keys()).length ===
      Array.from(this._game.getPlayers().keys()).length - 1
    ) {
      this._game.updateCurrentGameStatus(
        GameStatusEnum.WAITING_MAIN_USER_CHOICE
      );
    }
  }

  public getMainPlayer(): User {
    return this._mainPlayer;
  }

  public getRoundWhiteCardOptionsDisplay(): Map<string, string> {
    const returnOptions: Map<string, string> = new Map();
    const whiteCardListIdList: string[] = Array.from(
      this._whiteCardList.keys()
    );

    whiteCardListIdList.forEach((userId: string) => {
      const card: Card = this._whiteCardList.get(userId)!;

      returnOptions.set(
        userId,
        this._blackCard
          .displayContent()
          .replace(CARD_DISPLAY_QUESTION_SYMBOL, card.displayContent()!)
      );
    });

    return returnOptions;
  }

  public defineRoundWinner(userId: string): void {
    const winnerPlayer: User | undefined = this._game.getPlayers().get(userId);
    if (!winnerPlayer) {
      throw new Error("Winner not found");
    }
    this._winner = winnerPlayer;
  }

  public getRoundWinner(): User | null {
    return this._winner;
  }
}
