import React, { Component } from 'react';
import './App.css';

const CROSS = "X";
const NAUGHT = "O";

const makeBoard = function () {
  var result = [];
  for (var i = 0; i < 3; i++) {
    result.push([null, null, null]);
  }
  return result;
};

const checkCol = function () {

}

const checkDiagonal = function () {

}

const constGenRandomIndex = function () {
  var randomRow = Math.floor(Math.random()*2);
  var randomCell = Math.floor(Math.random()*2);
  return [randomRow, randomCell];
} 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: makeBoard(),
      player: CROSS,
      turnCount: 0,
      winner: null
    }
  }

  handleClick (row,cell) {
    var currentTurn = this.state.player;
    var currentNumberOfTurns = this.state.turnCount;

    var newBoard = this.state.board.slice();
    if (newBoard[row][cell] === null) {
      newBoard[row][cell] = currentTurn;
      this.setState({
        board: newBoard,
        player: currentTurn === NAUGHT ? CROSS : NAUGHT,
        turnCount: currentNumberOfTurns+=1
      }, function () {
        this.checkRow();
        this.checkCol();
        this.checkDiagonal();
      });
    }

  }

  checkRow () {
    this.state.board.map( (row) => {
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== null) {
        //user won
        this.setState({
          winner: row[0]
        })
      }
    });
  }

  checkCol () {
    var row1 = this.state.board[0].slice();
    var row2 = this.state.board[1].slice();
    var row3 = this.state.board[2].slice();

    for (var i = 0; i < 3; i++) {
      if (row1[i] === row2[i] && row2[i] === row3[i] && row1[i] !== null) {
        //user won
        console.log('winner in col', row1[i])
        this.setState({
          winner: row1[i]
        })
      }
    }
  }

  checkDiagonal () {
    for (var i = 0; i < this.state.board.length; i++) {
      var leftDiag = null;
      var rightDiag = null;
      if (i%2 === 0) {
        //if the left or right not set then first line
        if (leftDiag === null && rightDiag === null) {
          if (this.state.board[i][0] !== null) {
            leftDiag = this.state.board[i][0];
          } else if (this.state.board[i][2] !== null) {
            rightDiag = this.state.board[i][2];
          } else {
            return;
          }
        } else {
          if (leftDiag !== null && this.state.board[i][2] !== null) {
            console.log('left win')
            this.setState({
              winner: leftDiag
            });
          } else if (rightDiag !== null && this.state.board[i][0] !== null) {
            console.log('right win')
            this.setState({
              winner: rightDiag
            });
          }
        }
      
      } else {
        //check the odd index
        if (this.state.board[i][1] !== leftDiag || this.state.board[i][1] !== rightDiag) {
          return;
        }
      }
    }
  }

  render() {


    var board = this.state.board.map( (row, index) => {
      var newRow = row.map( (cell, i) => {
        return (<td key={i} style={{padding:"40px"}} onClick={this.handleClick.bind(this,index,i)}>{cell}</td>);
      });
      return (<tr key={index}>{newRow}</tr>);
    });

    return (
      <div className="container">
        <h1>This is a game of Tic Tac Toe</h1>
        {this.state.turnCount === 9 ? <p>Game over</p> : null}
        {this.state.winner !== null ? <p>{this.state.winner}{"'"}s win!</p> : null}
        <table className="table-bordered">
          <tbody>
            {board}
          </tbody>
        </table>


      </div>
    );
  }
}

export default App;
