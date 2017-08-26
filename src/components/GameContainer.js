import React from 'react';
import { Game } from './Game';
import { SelectGameType } from './SelectGameType';
import { SelectGameSymbol } from './SelectGameSymbol';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class GameContainer extends React.Component{
	
	constructor(props) {
		super(props);
		this.state={
			square : [[null,null,null],[null,null,null],[null,null,null]],
			nextSymbol : "X",
			gameState : "select-game-type",
			isFinished : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			nextPlayer : ''

		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
		this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
		this.handleGameSymbolSelect = this.handleGameSymbolSelect.bind(this);
	}

	/*
	* function to check if line is matched
	*/
	isLineFilled(square,indexes){
		if(square[indexes[0][0]][indexes[0][1]] && square[indexes[0][0]][indexes[0][1]] === square[indexes[1][0]][indexes[1][1]] && square[indexes[1][0]][indexes[1][1]] === square[indexes[2][0]][indexes[2][1]]){
			return true;
		}else{
			return false;
		}

	}

	/*
	* function to calculate winner
	*/
	calculateWinner(square){
		var winSquences = [
			['0-0','0-1','0-2'],
			['0-0','1-0','2-0'],
			['0-0','1-1','2-2'],
			['0-1','1-1','2-1'],
			['0-2','1-2','2-2'],
			['0-2','1-1','2-0'],
			['1-0','1-1','1-2'],
			['2-0','2-1','2-2']
		];

		for(var i=0;i<winSquences.length;i++){
			var sequence = winSquences[i];
			var indexes = sequence.map(function(seq){
				return seq.split('-');
			});
			if(this.isLineFilled(square , indexes) ){
				return {
					isFinished : true,
					winSquares : sequence,
					winSymbol  : square[indexes[0][0]][indexes[0][1]]
				}
			}
		}

		return {
			isFinished : false
		}
	}


	findWinner(symbol){
		if(this.state.playerOneSymbol===symbol){
			return 'playerOne';
		}
		else{
			return 'playerTwo';
		}
	}

	/*
	* Handle click on square
	*/
	handleSquareClick(i,j){
		var square,
			result;
		square = this.state.square.slice(0);

		if(square[i][j]){
			return ;
		}

		square[i][j] =  this.state.nextSymbol;

		result = this.calculateWinner(square);
		
		if(result.isFinished){
			this.setState({
				gameState : "finished",
				isFinished : true,
				winner : this.findWinner(result.winSymbol),
				playerOneScore : this.findWinner(result.winSymbol)==='playerOne' ? this.state.playerOneScore + 1 : this.state.playerOneScore,
				playerTwoScore : this.findWinner(result.winSymbol)==='playerTwo' ? this.state.playerTwoScore + 1 : this.state.playerTwoScore,
				square : square,
				winSquares : result.winSquares
			})
		}else{
			this.setState({
				square : square,
				nextSymbol : (this.state.nextSymbol==="X") ? "0" : "X",
				nextPlayer : this.state.nextPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});
		}

		
	}


	/*
	* Handle game type select
	*/
	handleGameTypeSelect(type){
		if(type==='computer'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'computer'
			});
		}else if(type==='player'){
			this.setState({
				gameState : "select-game-symbol",
				gameType : 'player'
			});
		}
	}


	/*
	* Handle game  symbol select
	*/
	handleGameSymbolSelect(symbol){
		if(symbol==="X"){
			
			this.setState({
				gameState : "game-is-on",
				playerOneSymbol : "X",
				playerTwoSymbol : "0",
				nextSymbol : "X",
				nextPlayer : "playerOne"
			});

		}else if(symbol==="0"){
			
			this.setState({
				gameState : "game-is-on",
				playerOneSymbol : "0",
				playerTwoSymbol : "X",
				nextSymbol : "0",
				nextPlayer : "playerOne"
			});
		}
	}


	



	render(){
		console.log('main-render');

		var displayedComponents;

		if(this.state.gameState==="select-game-type"){
			
			displayedComponents = (				
				<SelectGameType
					handleGameTypeSelect={this.handleGameTypeSelect}
					key = "select-game-type"
				/>
			);

		}else if(this.state.gameState==="select-game-symbol"){
			
			displayedComponents = (
				<SelectGameSymbol 
					key="select-game-symbol"
					handleGameSymbolSelect ={this.handleGameSymbolSelect}
				/>	
			);
		}
		

		if(this.state.gameState==="game-is-on"||this.state.gameState==="finished"){
			
			displayedComponents = ( 
				<Game 
					playerOneScore={this.state.playerOneScore}
					playerTwoScore={this.state.playerTwoScore}
					isFinished={this.state.isFinished}
					winSquares={this.state.winSquares}
					square={this.state.square}
					onSquareClick={this.handleSquareClick}
					gameType={this.state.gameType}
					nextPlayer={this.state.nextPlayer}
				/>
			);
		}

		return (
			<div>
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionAppearTimeout={700}
					transitionEnterTimeout={700}
					transitionLeaveTimeout={700}
				>
				{displayedComponents}
				</ReactCSSTransitionGroup>
			</div>

			);
	}
}