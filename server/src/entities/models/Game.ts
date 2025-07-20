import { CardListPtDTO } from "../../constants/cardList_pt";
import { DEFAULT_NUMBER_OF_ROUNDS_PER_PLAYER } from "../../constants/game";
import { GameStatusEnum, RoundWinnerItem } from "../../types/game.type";
import {
  getFirstElementFromArray,
  getLastElementFromArray,
} from "../../utils/array.utils";
import { createCardSet } from "../../utils/card";
import { getMapKeysAsArray } from "../../utils/map.utils";
import { Card } from "./Card";
import { Dealer } from "./Dealer";
import { GameRound } from "./GameRound";
import { User } from "./User";

export class Game {
  private _started: boolean;
  private _players: Map<string, User>;
  private _dealer: Dealer;
  private _cards: Card[];
  private _usedCards: Card[];
  private _startDate: Date | null;
  private _rounds: GameRound[];
  private _numberOfRounds: number;
  private _currentStatus: GameStatusEnum;
  private _winner: User | null;

  constructor() {
    this._started = false;
    this._players = new Map<string, User>();
    this._dealer = new Dealer(this);
    this._cards = createCardSet(CardListPtDTO);
    this._usedCards = [];
    this._startDate = null;
    this._rounds = [];
    this._numberOfRounds = 0;
    this._currentStatus = GameStatusEnum.LOBBY;
    this._winner = null;
  }

  public setPlayers(players: Map<string, User>): void {
    this._players = players;
  }

  public start() {
    this._dealer.shuffleCards();
    this._started = true;
    this._startDate = new Date();
    this._numberOfRounds =
      Array.from(this._players.keys()).length *
      DEFAULT_NUMBER_OF_ROUNDS_PER_PLAYER;

    const playerIdList: string[] = Array.from(this._players.keys());
    const initialDealSet: Map<string, Card[]> = this._dealer.doInitialDeal(
      playerIdList,
      this._cards
    );

    playerIdList.forEach((playerId) => {
      this._players
        .get(playerId)
        ?.updateCurrentCards(initialDealSet.get(playerId)!);
    });

    this._currentStatus = GameStatusEnum.GAME_STARTED;
  }

  public getPlayers(): Map<string, User> {
    return this._players;
  }

  public getDealer(): Dealer {
    return this._dealer;
  }

  public getCards(): Card[] {
    return this._cards;
  }

  public updateCards(cards: Card[]) {
    this._cards = cards;
  }

  public getUsedCards(): Card[] {
    return this._usedCards;
  }

  public updateUsedCards(cards: Card[]) {
    this._usedCards = cards;
  }

  private _getNextMainPlayer(): User {
    const lastGameRound: GameRound | undefined = getLastElementFromArray(
      this._rounds
    );
    const playerIdList: string[] = Array.from(this._players.keys());

    if (!lastGameRound) {
      return this._players.get(playerIdList[0])!;
    }

    const lastMainPlayerId: string = lastGameRound.getMainPlayer().getId();
    const indexOfIdOnList: number = playerIdList.findIndex(
      (id: string) => id === lastMainPlayerId
    )!;

    return this._players.get(
      playerIdList[indexOfIdOnList + 1] ?? playerIdList[0]
    )!;
  }

  public getGameRounds() {
    return this._rounds;
  }

  public updateCurrentGameStatus(newStatus: GameStatusEnum): void {
    this._currentStatus = newStatus;
  }

  public startNewRound(): GameRound {
    if (this._rounds.length >= this._numberOfRounds) {
      throw new Error("Limit of rounds exceeded");
    }

    const newRound = new GameRound(this, this._getNextMainPlayer());
    this._rounds.push(newRound);
    this._currentStatus = GameStatusEnum.ROUND_STARTED;
    this._currentStatus = GameStatusEnum.WAITING_CARD_CHOICE;
    return newRound;
  }

  public getRoundWinnersList(): RoundWinnerItem[] {
    const roundWinnersList: string[] = this._rounds.map(
      (round) => round.getRoundWinner()?.getId()!
    );

    const userWinsList: RoundWinnerItem[] = getMapKeysAsArray(
      this._players
    ).map((userId: string) => {
      return {
        numberOfWins: 0,
        userId,
      };
    });

    roundWinnersList.forEach((userId: string) => {
      const userWinItem: RoundWinnerItem = userWinsList.find(
        (item) => item.userId === userId
      )!;

      userWinItem.numberOfWins += 1;
    });

    return userWinsList.sort((a, b) =>
      a.numberOfWins > b.numberOfWins ? -1 : 1
    );
  }

  public finishGame(): void {
    const roundWinnersList: RoundWinnerItem[] = this.getRoundWinnersList();
    this._winner = this._players.get(
      getFirstElementFromArray(roundWinnersList)?.userId!
    )!;
    this._currentStatus = GameStatusEnum.GAME_FINISHED;
  }
}
