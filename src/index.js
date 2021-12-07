import React from "react";
import ReactDom from "react-dom";
import "./index.css";

function Square(props) { /*Square component parent: Board */

    return (
        <button className = "square" onClick = {() => props.onClick()}> 
            {props.value} 
         </button>
    );
}

class Board extends React.Component { /*Board component child: Square */

    constructor(props) {

        super(props);

        this.state = {
            squares: Array(9).fill(null),
            XisNext: true
        };
    }

    handleClick(i) {

        const squares = this.state.squares.slice();

        if (winner(squares) || squares[i]) {

            return;
        }

        squares[i] = this.state.XisNext ? "X" : "O";
        this.setState({
            squares: squares,
            XisNext: !this.state.XisNext
        });
    }

    renderSquare(i) {

        return (
            <Square 
                value = {this.state.squares[i]} 
                onClick = {() => this.handleClick(i)}
            />
        );
    }

    render() {

        var winner_player = winner(this.state.squares);
        var status;

        if (winner_player) {

            status = "Winner :" + winner_player;
        
        } else {

            status = "Next Player: " + (this.state.XisNext ? "X" : "O");
        }

        return (

            <div>
                <div className = "status"> {status} </div>

                <div className = "board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>

                <div className = "board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>

                <div className = "board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component { /*Game component child: Board */

    render() {

        return (

            <div className = "game">
                <div className = "game-board">
                    <Board />
                </div>

                <div className = "game-info">
                    <div> {/*status*/} </div>
                    <div> {/*TODO*/} </div>
                </div>
            </div>
        );
    }
}

function winner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (var i = 0; i < lines.length; i++) {

        var [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            return squares[a];
        }
    }

    return null;
}

ReactDom.render(<Game/>, document.getElementById("root"));