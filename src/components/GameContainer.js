import React from 'react';
import { Game } from './Game';
import { SelectGameType } from './SelectGameType';
import { SelectGameSymbol } from './SelectGameSymbol';
import { calculateNextMove } from '../helpers/nextMove';
import { calculateWinner } from '../helpers/resultCalc';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class GameContainer extends React.Component{
	
	constructor(props) {
		super(props);
		this.state={
			square : [[null,null,null],[null,null,null],[null,null,null]],
			nextSymbol : "X",
			gameState : "select-game-type",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			currentPlayer : '',
			winner : '',
			winSquares : null

		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
		this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
		this.handleGameSymbolSelect = this.handleGameSymbolSelect.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
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
	*Restart game
	*/
	startNewGame(){
		setTimeout(function(){
			this.setState({
				square : [[null,null,null],[null,null,null],[null,null,null]],
				nextSymbol : this.state.playerOneSymbol,
				gameState : "game-is-on",
				isFinished : false,
				isTied : false,
				currentPlayer : "playerOne",
				winner : '',
				winSquares : null
			});

		}.bind(this) , 3000 );
	}


	/*
	*Function to play computers part
	*/
	playComputerPart(){
		var square,
			result,
			nextMove = calculateNextMove(this.state.square);
		
		square = this.state.square.slice(0);

		square[nextMove[0]][nextMove[1]] =  this.state.nextSymbol;

		result = calculateWinner(square);
		//console.log('c',result);


		if(result.isFinished){
			this.handleGameFinish(square , result );
		}else{
			this.setState({
				square : square,
				nextSymbol : (this.state.nextSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});

		}
	}

	/*
	*Function to handle game 
	*/
	handleGameFinish(square , result ){
		this.setState({
			gameState : "finished",
			isFinished : true,
			winner : this.findWinner(result.winSymbol),
			playerOneScore : this.findWinner(result.winSymbol)==='playerOne' ? this.state.playerOneScore + 1 : this.state.playerOneScore,
			playerTwoScore : this.findWinner(result.winSymbol)==='playerTwo' ? this.state.playerTwoScore + 1 : this.state.playerTwoScore,
			square : square,
			winSquares : result.winSquares
		});

		this.startNewGame();
	}

	/*
	*handle reset btn click
	*/
	handleResetClick(){
		this.setState({
			square : [[null,null,null],[null,null,null],[null,null,null]],
			nextSymbol : "X",
			gameState : "select-game-type",
			isFinished : false,
			isTied : false,
			playerOneSymbol : "",
			playerTwoSymbol : "",
			playerOneScore : 0,
			playerTwoScore : 0,
			gameType : '',
			currentPlayer : '',
			winner : '',
			winSquares : null

		});
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

		result = calculateWinner(square);
		
		//if game is tied return
		if(result.isFinished && result.isTied){
			this.setState({
				isTied : true,
				isFinished : true
			});

			this.startNewGame();
			return;
		}
		
		if(result.isFinished){

			this.handleGameFinish(square , result );

		}else{
			this.setState({
				square : square,
				nextSymbol : (this.state.nextSymbol==="X") ? "0" : "X",
				currentPlayer : this.state.currentPlayer === "playerOne" ? "playerTwo" : "playerOne"
			});

		}
		
	}


	componentDidUpdate(prevProps, prevState) {
		if(this.state.gameType==="computer" && this.state.currentPlayer==="playerTwo" && !this.state.isFinished && !this.state.isTied){			
			this.playComputerPart();
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
				currentPlayer : "playerOne"
			});

		}else if(symbol==="0"){
			
			this.setState({
				gameState : "game-is-on",
				playerOneSymbol : "0",
				playerTwoSymbol : "X",
				nextSymbol : "0",
				currentPlayer : "playerOne"
			});
		}
	}


	



	render(){
		//console.log('main-render');

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
					isTied={this.state.isTied}
					winSquares={this.state.winSquares}
					winner={this.state.winner}
					square={this.state.square}
					onSquareClick={this.handleSquareClick}
					gameType={this.state.gameType}
					currentPlayer={this.state.currentPlayer}
					handleResetClick={this.handleResetClick}
				/>
			);
		}

		return (
			<div>
				
				{displayedComponents}
				
			</div>

			);
	}
}

// <ReactCSSTransitionGroup
// 					transitionName="fade"
// 					transitionAppear={true}
// 					transitionAppearTimeout={700}
// 					transitionEnterTimeout={700}
// 					transitionLeaveTimeout={700}
// 				>
// 				</ReactCSSTransitionGroup>