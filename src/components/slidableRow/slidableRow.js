/**
 * this compoennt renders slidable row with some cards at random position while scrolling home page
 */

import React from 'react';
import './slidableRow.css';

class SlidableRow extends React.Component{
    render(){
return (
    <div id="parContainer">
        <div className="rowItem"></div>
        <div className="rowItem"></div>
        <div className="rowItem"> </div>
        <div className="rowItem"></div>
        <div className="rowItem"></div>

    </div>
);
    }
}

export default SlidableRow;