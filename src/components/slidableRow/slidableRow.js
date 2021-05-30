/**
 * this compoennt renders slidable row with some cards at random position while scrolling home page
 */

import React from 'react';
import './slidableRow.css';
import GameCardType3 from '../gameCardType3/gameCardType3.js';
class SlidableRow extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
return (<>
<div class="container-fluid" id="slidableRow">
    
    <h3>{this.props.rowTitle}</h3>
    <div class="row flex-row flex-nowrap" >
        <div >
        <GameCardType3/>
        </div>
        <div >
        <GameCardType3/>
        </div>
        <div >
        <GameCardType3/>
        </div>
      
        <div >
        <GameCardType3/>
        </div>
        <div >
        <GameCardType3/>
        </div>
        <div >
        <GameCardType3/>
        </div>
        <div >
        <GameCardType3/>
        </div>
        
    </div>
</div></>
);
    }
}

export default SlidableRow;