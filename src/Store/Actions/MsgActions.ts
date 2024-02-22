/* -- Byimaan -- */

import { ADD_MSG, DEL_MSG, RESET_MSG } from "../Refs";
import { nanoid } from "@reduxjs/toolkit";

type msgStateType = {
    id: string,
    data: string 
};

type actionType = {
    type: string,
    payload: msgStateType,
};

export const addMsg = (msg: string): actionType => ({
    type: ADD_MSG,
    payload: {
        id: nanoid(),
        data: msg,
    }
});

export const delMsg = (id: string | number): actionType => ({
    type: DEL_MSG,
    payload: {
        id: String(id),
        data: 'N/A',
    }
});

export const resetMsg = (): actionType=> ({
    type: RESET_MSG,
    payload: {
        id: 'N/A',
        data: 'N/A'
    }
});
