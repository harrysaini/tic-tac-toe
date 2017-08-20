import React from 'react';

export class ScoreBoard extends React.Component{
	
	render(){
		var secondName = "Computer's ";

		if(this.props.isTwoPlayer){
			secondName = "Player 2's ";
		}

		return (
			<div className="score-board">
				<div className = 'first-score'>
					<div> Player 1 </div>
					<div> {this.props.firstPlayerScore} </div>
				</div>
				<div className = 'second-score'>
					<div> {secondName} </div>
					<div> {this.props.secondPlayerScore} </div>
				</div>
			</div>
		);
	}
}