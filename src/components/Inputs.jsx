import React from 'react';
import gallery from '../images/gallery.png';
import plus from '../images/plus.png';

const Inputs = () => {
  return (
    <div className='inputCont'>
        <input type="text" placeholder='Type Something' />
        <form className="send">
            <img src={plus} alt="" />
            <input type="file" id='file' className='fileInput'/>
            <label htmlFor="file">
                <img src={gallery} alt="" />
            </label>
            <button>send</button>
        </form>
    </div>
  )
}

export default Inputs