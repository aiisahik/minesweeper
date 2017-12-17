import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqualKeys from '../Utils/deepEqual';
// import deepEqual from 'deep-equal';
import Square from '../Models/Square';
import classNames from 'classnames';
import './SquareView.css';

class SquareView extends Component {
    constructor(props){
        super(props);
        this.squareData = {};
    }
    shouldComponentUpdate(nextProps, nextState){
        const shouldUpdate = !deepEqualKeys(this.squareData, nextProps.square.data, [
            'isMine', 'isFlagged', 'isClicked', 'numSideMines',
        ]);
        return shouldUpdate;
    }
    render() {
        this.squareData = Object.assign({}, this.props.square.data);
        return (
            <div className={classNames("square", "square-" + this.squareData.numSideMines)}
                onClick={(e) => this.props.onSquareClick(e, this.props.square)}
                onContextMenu={(e) => this.props.onSquareClick(e, this.props.square)}
            >
                {this.squareData.isMine && this.squareData.isClicked ? (
                            <span className="mine"></span>
                ) : 
                this.squareData.isFlagged ? (
                        <span className="flag"></span>
                ) :
                    this.squareData.isClicked === false ? (
                        <span className="unclicked"></span>
                    ) : (
                            <span className="show">
                                    {this.squareData.numSideMines > 0 ? this.squareData.numSideMines : ''}
                            </span>
                        )
                }
            </div>
        );
    }
}

SquareView.propTypes = {
    square: PropTypes.instanceOf(Square),
    onSquareClick: PropTypes.func,
};

export default SquareView;