import React from 'react';
import {TurnDisplayer} from './TurnDisplayer';
import {ScoreBoard} from './ScoreBoard';
import {Board} from './Board';

export class Game extends React.Component{
	
	render(){
		return (
			<div>
				<TurnDisplayer />
				<ScoreBoard />
				<Board />
			</div>
		);
	}
}