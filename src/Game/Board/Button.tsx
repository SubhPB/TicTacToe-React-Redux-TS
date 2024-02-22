/* -- Byimaan -- */

import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaComputer } from "react-icons/fa6";
import { BsRobot } from "react-icons/bs";
import { USER_VS_AI, USER_VS_COM, USER_VS_USER, oppoentType } from "../../Store/Refs";
import './button.scss';
import { RootState } from "../../Store/Reducers/RootReducer";
import { changePlayer } from "../../Store/Actions/GameActions";

function Button() {

    const dispatch = useDispatch();
    const currOppoent: oppoentType = useSelector( (state: RootState) => state.game.gameConfig.gameType);

    const switchPlayer = (oppoent: oppoentType) => {
        if ( !(oppoent === currOppoent) ){
            dispatch(changePlayer(oppoent));
        };
    };

    return (
        <div className='b-btns'>
        <OneByOneButton id={USER_VS_USER} currActiveBtn={currOppoent}  handleClick={switchPlayer}/>
        <OneByAI id={USER_VS_AI} currActiveBtn={currOppoent} handleClick={switchPlayer}/>
        <OneByComputer id={USER_VS_COM} currActiveBtn={currOppoent} handleClick={switchPlayer}/>
        </div>
    )
};

interface propType{
    id: string;
    currActiveBtn: oppoentType;
    handleClick: Function;
}

export function OneByOneButton({id, currActiveBtn, handleClick}:propType){

    return (
        <div id={id} onClick={() => handleClick(id)}  className={`b-btn ${id === currActiveBtn ? 'active': ''}`}>

            <BsPersonFill className='b-p-icon 1vs1'/>
            <LuSwords className='b-p-icon sword' /> 
            <BsPersonFill className=' b-p-icon 1vs1'/>
            
        </div>
    );
};

export function OneByComputer({id, currActiveBtn, handleClick}:propType){
    return (
        <div id={id} onClick={() => handleClick(id)}  className={`b-btn ${id === currActiveBtn ? 'active': ''}`}>

            <BsPersonFill className='b-p-icon 1vs1'/>
            <LuSwords className='b-p-icon sword' /> 
            <FaComputer className=' b-p-icon 1vsC'/>
        </div>
    );
};

export function OneByAI({id, currActiveBtn, handleClick}:propType){
    return (
        <div id={id} onClick={() => handleClick(id)} className={`b-btn ${id === currActiveBtn ? 'active': ''}`}>

            <BsPersonFill className='b-p-icon 1vs1'/>
            <LuSwords className='b-p-icon sword'/> 
            <BsRobot className=' b-p-icon 1vsAI' />
        </div>
    );
};


export default Button
