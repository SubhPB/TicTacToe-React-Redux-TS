/* -- Byimaan -- */

import './button.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Reducers/RootReducer';


function MsgBox() {

  const msg: string | undefined = useSelector( (state: RootState) => {
    const msgs = state.messanger;
    return msgs.length > 0 ? msgs[msgs.length-1].data : undefined;
  });

  return (
    <div className='msg-box'>
      <p className='msg'>
        {msg ?? ' - Byimaan - '}
      </p>
    </div>
  )
}

export default MsgBox;
