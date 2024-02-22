/* -- Byimaan -- */

import { SWITCH_TURN, MAKE_MOVE,
    RESET_GAME, CHANGE_PLAYER,
    oppoentType,
} from "../Refs";

type returnType = {
    type: string, payload: string,
}

export const switchTurn = ():returnType => ({
    type: SWITCH_TURN,
    payload: 'N/A'
});

export const makeMove = (spot: string):returnType => ({
    type: MAKE_MOVE,
    payload: spot,
});

export const resetGame = (): returnType => ({
    type: RESET_GAME,
    payload: 'N/A',
});

// export const askComputer = (): returnType => ({
//     type: ASK_COM,
//     payload: 'N/A'
// });

// export const askAI = (): returnType => ({
//     type: ASK_AI,
//     payload: 'N/A'
// });

export const changePlayer = (oppoent: oppoentType): returnType => ({
    type: CHANGE_PLAYER,
    payload: oppoent
});