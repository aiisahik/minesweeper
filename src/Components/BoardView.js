import React from 'react';
import PropTypes from 'prop-types';
import SquareView from './SquareView';
import Board from '../Models/Board';
import './BoardView.css';

const BoardView = props => {
    return (
        <div className="board">
            { props.board.data.map((columns, xkey) => (
                <div key={xkey}> 
                    {columns.map((square, ykey) => {
                        return (
                            <SquareView
                                key={ykey}
                                onSquareClick={props.onSquareClick}
                                square={square}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    );
};

BoardView.propTypes = {
    board: PropTypes.instanceOf(Board),
    onSquareClick: PropTypes.func,
};

export default BoardView;