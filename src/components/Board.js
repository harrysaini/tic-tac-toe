import React , { Component }from 'react';
import { Square } from './Square';

export class Board extends Component{
	
	getSingleRowJSX(i){

		var squareJSX;

		for(var j=0;j<3;j++){
			squareJSX = (
				<div className={'square' , 'square-'+i+'-'+j} >
				<Square />
				</div>
				);
			rowArr.push[squareJSX];
		}
	}

	getBoardJSX(){
		var boardRowArr = [],
		rowArr,
		boardRowJSX;

		for(var i=0;i<3;i++){
			
			rowArr=getSingleRowJSX(i);
			
			boardRowJSX = (
				<div className='board-row'>
				{rowArr}
				</div> 
				);
			boardRowArr.push(boardRowJSXrd)
		}
	}
	

	render(){

		return (
			<div class="board">
			{this.getBoardJSX}
			</div>
			);
	}
}