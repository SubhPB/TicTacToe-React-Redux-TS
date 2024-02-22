/* -- Byimaan -- */

import { ADD_MSG, DEL_MSG, RESET_MSG } from "../Refs";

type msgStateType = {
    id: string,
    data: string 
};

type actionType = {
    type: string,
    payload: msgStateType,
};

const initialState: Array<msgStateType> = [];


const msgReducer = (state:Array<msgStateType> = initialState, action: actionType): Array<msgStateType> => {

    switch (action.type){
        case (ADD_MSG):   
           return [...state,action.payload];
        case (DEL_MSG):
            return state.filter( msg => msg.id !== action.payload.id);
        case (RESET_MSG): 
            return [];    
        default:
            return state;    
    };

};

export default msgReducer;