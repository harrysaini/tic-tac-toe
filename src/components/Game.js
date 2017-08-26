import React from 'react';
import {TurnDisplayer} from './TurnDisplayer';
import {ScoreBoard} from './ScoreBoard';
import {Board} from './Board';
import { Result } from './Result';

export class Game extends React.Component{
	
	render(){

		var resultDivJSX , 
			scoreBoardJSX,
			turnDisplayerJSX;

		scoreBoardJSX = (
			<ScoreBoard 
				isTwoPlayer={this.props.gameType==='player' ? true : false }
				playerOneScore={this.props.playerOneScore}
				playerTwoScore={this.props.playerTwoScore}
			/>
			);

		turnDisplayerJSX = (
			<TurnDisplayer
				nextPlayer = {this.props.nextPlayer}
				gameType = {this.props.gameType}
			/>
			);

		

		if(this.props.isFinished===true){
			
			resultDivJSX = (
			<Result
				winner = {this.props.winner}
				gameType = {this.props.gameType}
			/>
			);

			return (
				<div className="game-box-inner">
					{resultDivJSX}
					{scoreBoardJSX}
					<Board 
						isFinished={true}
						winSquares={this.props.winSquares}
						square={this.props.square} 
					/>
					{turnDisplayerJSX}
				</div>
				);
		}else{

			return (
				<div className="game-box-inner">
					{scoreBoardJSX}
					<Board 
						square={this.props.square} 
						onClick={this.props.onSquareClick}
					/>
					{turnDisplayerJSX}
				</div>
				);
		}
	}
}

// Game.propTypes = {
// 	square : React.PropTypes.array,
// 	onClick : React.PropTypes.func
// }