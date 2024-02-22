/* -- Byimaan -- */

import { MAKE_MOVE, SWITCH_TURN,
    RESET_GAME,CHANGE_PLAYER,
} from "../Refs";
import { gameInterface, actionType, gameInitialState } from "../types";
import { _makeMove } from "../../Game/assits";
const gameReducer = ( state: gameInterface = gameInitialState, action: actionType ): gameInterface => {

    switch (action.type){
        case SWITCH_TURN :
            return {...state, currPlayer: state.currPlayer === 'X' ? 'O': 'X'};
        case MAKE_MOVE: 
            return _makeMove(state,action.payload);
        case RESET_GAME:
            return gameInitialState;    
        case CHANGE_PLAYER:
            if (action.payload === state.gameConfig.gameType) return state;
            return {...gameInitialState, gameConfig: {...state.gameConfig,gameType: action.payload}};
        default:
            return state;      
    };
   
};

export default gameReducer;