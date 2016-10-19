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

  render() {

    var count = 0;
    var board = this.state.board.map( (row, index) => {
      var newRow = row.map(function (cell, i) {
        return (<td key={i} style={{padding:"40px"}}>{cell}</td>);
      });
      return (<tr key={index}>{newRow}</tr>);
    });

    return (
      <div className="container">
        <h1>This is a game of Tic Tac Toe</h1>

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
