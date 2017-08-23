import React , { Component }from 'react';
import { Square } from './Square';

export class Board extends Component{
	
	getSingleRowJSX(i){

		var squareJSX,
			rowArr=[];

		for(var j=0;j<3;j++){
			squareJSX = (
				<div className={'square square-'+i+'-'+j} key={i+'-'+j}>
				<Square />
				</div>
				);
			rowArr.push(squareJSX);
		}

		return rowArr;
	}

	getBoardJSX(){

		var boardRowArr = [],
		boardRowJSX;

		for(var i=0;i<3;i++){						
			boardRowJSX = (
				<div className='board-row' key={i}>
				{this.getSingleRowJSX(i)}
				</div> 
				);
			boardRowArr.push(boardRowJSX)
		}
		return boardRowArr;
	}
	

	render(){

		return (
			<div className="board-wrapper">
				<div className="board">
				{this.getBoardJSX()}
				</div>
			</div>
			);
	}
}