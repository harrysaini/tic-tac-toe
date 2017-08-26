import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export class TurnDisplayer extends React.Component{
	
	render(){
		

		var displayTurn ;
		if( this.props.gameType === 'computer' && this.props.nextPlayer === "playerTwo"){
			displayTurn = "Computer's turn ";
		}

		if( this.props.gameType === 'computer' && this.props.nextPlayer === "playerOne"){
			displayTurn = "Your's turn ";
		}

		if( this.props.gameType === 'player' && this.props.nextPlayer === "playerTwo"){
			displayTurn = "Player 2's turn ";
		}

		if( this.props.gameType === 'player' && this.props.nextPlayer === "playerOne"){
			displayTurn = "Player 1's turn  ";
		}

		console.log(displayTurn);
		return (

			
			<ReactCSSTransitionGroup
			transitionName="slide"
			transitionAppear={true}
			transitionAppearTimeout={700}
			transitionEnterTimeout={700}
			transitionLeaveTimeout={700}
			>
			<div className="turn-displayer">
			{displayTurn}
			</div>
			</ReactCSSTransitionGroup>

			
			);
	}
}

// TurnDisplayer.propTypes = {
// 	displayTurn : React.PropTypes.string
// }