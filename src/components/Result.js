import React from 'react';

export class Result extends React.Component{
	
	render(){
		
		var msg;
		if(this.props.gameType==='computer'){
			if(this.props.winner==='playerOne')
				msg = 'You won  :)';
			else
				msg = "You lost, try again!!";
		}

		if(this.props.gameType==='player'){
			if(this.props.winner==='playerOne')
				msg = 'Player 1 won :)';
			else
				msg = "Player two won :) ";
		}

		return (
			<div className="result-div">
				{msg}
			</div>
				
		);
	}
}
