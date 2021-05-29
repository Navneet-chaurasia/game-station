/**
 * this compoennt renders slidable row with some cards at random position while scrolling home page
 */

import React from 'react';
import './slidableRow.css';
import GameCardType3 from '../gameCardType3/gameCardType3.js';
class SlidableRow extends React.Component{
    render(){
return (<>
<div id="slidableRow">
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/>
    <GameCardType3/></div></>
);
    }
}

export default SlidableRow;