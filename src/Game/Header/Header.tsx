/* -- Byimaan -- */

import React from 'react';
import { IoGameControllerOutline } from "react-icons/io5";
import './style.scss'

function Header() {
  return (
    <div className='header'>
      <IoGameControllerOutline className='game-icon'/>
      <h2> <span>T</span>ic <span>T</span>ac <span>T</span>oe</h2>
    </div>
  )
}

export default Header;
