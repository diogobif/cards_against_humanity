export enum GameStatusEnum {
  LOBBY = "lobby",
  GAME_STARTED = "game_started",
  ROUND_STARTED = "round_started",
  WAITING_CARD_CHOICE = "waiting_card_choice",
  WAITING_MAIN_USER_CHOICE = "waiting_main_user_choice",
  ROUND_FINISHED = "round_finished",
  GAME_FINISHED = "game_finished",
}

export type RoundWinnerItem = {
  userId: string;
  numberOfWins: number;
};
