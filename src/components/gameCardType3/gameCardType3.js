/**
 * This will render card of type 3
 * This will be used to show games of different category
 * usually in a slidable row
 */

import React from 'react';
import './gameCardType3.css';

class GameCardType3 extends React.Component{
    render(){
return (
    <div id="gameCardType3">

  <div className="card">
    <div className="content">
      <h2 className="title">Mountain View</h2>
      <p className="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>
      <button className="btn">View Trips</button>
    </div>
  </div>
 

</div>
);
    }
}

export default GameCardType3;