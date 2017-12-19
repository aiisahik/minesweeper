import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Board from '../Models/Board';
import BoardView from './BoardView';
import TimerView from './TimerView';
import './GameView.css';
class GameView extends Component {
    constructor(props){
        super(props);
        this.onSquareClick = this.onSquareClick.bind(this);
        this.newGame = this.newGame.bind(this);
        // default game difficulty = easy
        this.state = {
            difficulty: 'easy',
            board: new Board('easy'),
            gameStarted: false,
        }
    }
    newGame(difficulty){
        this.setState({
            difficulty: difficulty,
            board: new Board(difficulty),
            gameStarted: false,
        });
    }
    onSquareClick(e, square){
        if (!this.state.gameStarted){
            // start the timer
            this.setState({
                gameStarted: true
            });
        }
        if (e.type === 'click'){
            const board = this.state.board.clickSquare(square);
            this.setState({
                board: board,
            })
        } else if (e.type === 'contextmenu'){
            console.log('flag');
            const board = this.state.board.toggleFlag(square);
            this.setState({
                board: board,
            });
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if (this.state.board.hasWon || this.state.board.hasLost){
            // stop the timer
            this.setState({
                gameStarted: false
            })
        }
    }
    render() {
        return (
            <div className="game-container">
                <div className="game">
                    <div className="header">
                        <div className="counts">{this.state.board.numPossiblyRemainingMines}</div>

                        <div className={classNames("face", {
                                "smile": !this.state.board.hasLost,
                                "frown": this.state.board.hasLost
                            })}
                            onClick={(e) => this.newGame(this.state.difficulty)}
                        ></div>

                        <TimerView
                            started={this.state.gameStarted}
                        />
                    </div>
                    <BoardView
                        board={this.state.board}
                        onSquareClick={this.onSquareClick}
                    />
                    {this.state.board.hasWon && (<div className="game-won"> You Won! </div>)}
                    {this.state.board.hasLost && (<div className="game-lost"> You Lost! </div>)}
                </div>
                <div className="game-select">
                    <button type="button" onClick={(e) => this.newGame('easy')}>Easy</button>
                    <button type="button" onClick={(e) => this.newGame('intermediate')}>Intermediate</button>
                    <button type="button" onClick={(e) => this.newGame('hard')}>Hard</button>
                </div>
            </div>
        );
    }
}

GameView.propTypes = {
    board: PropTypes.instanceOf(Board)
};

export default GameView;