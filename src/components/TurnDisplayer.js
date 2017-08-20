import React from 'react';
import ReactDOM from 'react-dom';

export class TurnDisplayer extends React.Component{
	
	render(){
		return (
			<div className="turn-displayer">
				{this.props.displayTurn}
			</div>
		);
	}
}