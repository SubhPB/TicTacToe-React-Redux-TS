/* -- Byimaan -- */


// -- for messages --
export const ADD_MSG = 'ADD_MSG';
export const DEL_MSG = 'DEL_MSG';
export const RESET_MSG = 'RESET_MSG';

// -- for game logic
export const SWITCH_TURN = 'SWITCH_TURN';
export const MAKE_MOVE = 'MAKE_MOVE';
export const RESET_GAME = 'RESET_GAME';
export const ASK_COM = 'ASK_COM';
export const ASK_AI = 'ASK_AI';

export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const USER_VS_USER:oppoentType = 'USER-V/S-USER';
export const USER_VS_COM:oppoentType= 'USER-V/S-COM';
export const USER_VS_AI:oppoentType = 'USER-V/S-AI';

export type oppoentType = 'USER-V/S-USER' | 'USER-V/S-COM' | 'USER-V/S-AI';
export type playerType = 'X' | 'O';
export interface gameConfigInterface {
    gameType: oppoentType,
    selfLetter: playerType,
    opponentLetter: playerType,
};

export const EMPTY = 'N/A';
