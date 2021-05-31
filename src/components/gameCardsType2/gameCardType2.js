/***
 * this component renders a special type of card
 * This will render featured and newly launched games card
 */
import React from 'react';
import './gameCardType2.css';
import { Link } from 'react-router-dom';
class GameCardType2 extends React.Component{

    render(){
return (
    <div class="wrapper">

	
<h2><strong>Trending</strong></h2>
	<div class="cards">
	

		<figure class="card">

			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/1.jpg" alt="sjwjspwjps"/>

			<figcaption><Link to="/games/snakeGame/level1"> Snake Game</Link></figcaption>

		</figure>

		<figure class="card">
		
			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/2.jpg" alt="sjwjspwjps"/>

			<figcaption><Link to="/games/coronaGoGame"> Corona Go Game</Link></figcaption>

		</figure>

		<figure class="card">

			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/3.jpg" alt="sjwjspwjps"/>

			<figcaption>Minion Masters</figcaption>

		</figure>

		<figure class="card">

			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/4.jpg" alt="sjwjspwjps"/>

			<figcaption>KoseBoz!</figcaption>

		</figure>

	</div>

	<h2><strong>What's new?</strong></h2>

	<div class="news">

		<figure class="article">

			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/news1.jpg" alt="sjwjspwjps"/>

			<figcaption>

				<h3>New Item</h3>

				<p>

					In today’s update, two heads are better than one, and three heads are better than that, as the all-new Flockheart’s Gamble Arcana item for Ogre Magi makes its grand debut.

				</p>

			</figcaption>

		</figure>

		<figure class="article">

			<img src="https://mrreiha.keybase.pub/codepen/hover-fx/news2.png" alt="sjwjspwjps"/>

			<figcaption>

				<h3>Update</h3>

				<p>

					Just in time for Lunar New Year and the Rat’s time in the cyclical place of honor, the Treasure of Unbound Majesty is now available.

				</p>

			</figcaption>

		</figure>

	</div>
	<h2><strong></strong></h2>

</div>
);
    }
}


export default GameCardType2;