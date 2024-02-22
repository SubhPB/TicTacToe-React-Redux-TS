/* -- Byimaan -- */

import React from 'react';
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";

type letter = {
   symbol?: 'X' | 'O',
   blink: boolean
};

function Letter({symbol, blink=false}: letter) {

    return (
        <div className='letter'>
        {
        symbol && (symbol === 'X' ? <ImCross className={`l-icon X ${blink ? 'blink': ''}`} /> : <FaRegCircle className={`l-icon O ${blink ? 'blink': ''}`} />)
        }
        </div>
    );
};


export default Letter
