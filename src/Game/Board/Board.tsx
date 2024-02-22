/* -- Byimaan -- */

import Letter from './Letter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducers/RootReducer';
import { addMsg } from '../../Store/Actions/MsgActions';
import { EMPTY, USER_VS_AI, USER_VS_COM, USER_VS_USER, playerType } from '../../Store/Refs';
import { makeMove } from '../../Store/Actions/GameActions';
import './style.scss';
import { _askAI, _askComputer} from '../assits';

interface boardItemType {
  symbol: playerType | null,
  id: string,
  wait: boolean,
  winningSpots: Array<number>
};

function Board() {

  const dispatch = useDispatch();
  const gameStore = useSelector( (state: RootState) => state.game );
  const matrix = gameStore.board;
  const board = matrix.reduce( (acc, row) => acc.concat(row),[]);

  const wait = (gameStore.gameConfig.opponentLetter === gameStore.currPlayer) && !(gameStore.gameConfig.gameType === USER_VS_USER) && (!gameStore.gameIsOver);

  if (gameStore.message !== EMPTY){
    dispatch(addMsg(gameStore.message))
  };

  if (wait){
    if (gameStore.gameConfig.gameType === USER_VS_COM){
      dispatch(makeMove(`${_askComputer(gameStore, gameStore.currPlayer)}`));
    } else if (gameStore.gameConfig.gameType === USER_VS_AI){
      
    const move = _askAI(gameStore, gameStore.currPlayer);
    if (typeof move === 'number') dispatch(makeMove(`${move}`));

      
    };
  };

  const propsForBoardItem:boardItemType = {
    id: EMPTY,
    symbol: null,
    wait: wait || gameStore.gameIsOver,
    winningSpots: gameStore.winningSpots
  };

  const getProp = (val: playerType |null,ind: number): boardItemType => {
     return {
      ...propsForBoardItem,
      id: `${ind}`,
      symbol: val
    };
  };

  return (
    
    <div className='board'>

      { board.map( ( v,i ) => 
        <BoardItem 
          key={i} props={getProp(v,i)}
        />
      )}

    </div>

  )
};

interface propType{
  props: boardItemType
}

const BoardItem = ({props}: propType) => {

  const dispatch: Function = useDispatch();

  const handleClick = () => {
    if (!props.symbol && !props.wait){
      dispatch(makeMove(props.id));
    };
  };

  return (
    <div data-id={props.id} onClick={handleClick} className="board-item">
      { props.symbol && <Letter symbol={props.symbol} blink={props.winningSpots.includes(Number(props.id))}/> }
    </div>
  )
};

export default Board;
