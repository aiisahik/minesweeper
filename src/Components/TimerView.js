import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TimerView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.incrementTimer = this.incrementTimer.bind(this);
    }
    componentWillReceiveProps(newProps){
        if (newProps.started !== this.props.started){
            if (newProps.started === true){
                this.startTimer();
            } else if (newProps.started === false){
                this.stopTimer();
            }
        }
    }
    incrementTimer(){
        this.setState({
            timer: this.state.timer + 1
        });
    }
    startTimer() {
        this.timer = setInterval(this.incrementTimer, 1000);
    }
    stopTimer(){
        clearInterval(this.timer);
    }
    render(){
        return (
            <div className="counts timer">{this.state.timer}</div>
        )
    }
};

TimerView.propTypes = {
    gameStarted: PropTypes.bool,
};

export default TimerView;