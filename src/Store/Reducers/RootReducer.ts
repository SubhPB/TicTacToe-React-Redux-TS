/* -- Byimaan -- */

import { combineReducers } from "@reduxjs/toolkit";
import msgReducer from "./MsgReducer";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
    messanger: msgReducer,
    game: gameReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;