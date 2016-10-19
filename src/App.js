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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: makeBoard(),
      player: CROSS,
      turnCount: 0
    }
  }

  handleClick (row,cell) {
    var currentTurn = this.state.player;
    var currentNumberOfTurns = this.state.turnCount;

    var newBoard = this.state.board.slice();
    newBoard[row][cell] = currentTurn;

    this.setState({
      board: newBoard,
      player: currentTurn === NAUGHT ? CROSS : NAUGHT,
      turnCount: currentNumberOfTurns+=1
    });

  }

  render() {

    var finished;
    
    if (this.state.turnCount === 9) finished = "Game Over";

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
