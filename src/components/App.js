import React , { Component }from 'react';
import { GameContainer } from './GameContainer';

export class App extends Component{
	
	render(){
		return (
			<div className='main-container'>
				<div className="game-box">
					<GameContainer />
				</div>
			</div>
		);
	}
}