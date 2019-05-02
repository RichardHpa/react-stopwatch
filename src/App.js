import React, { Component } from 'react';
import './App.scss';
var timerInt;

class App extends Component {
    constructor(){
        super();
        this.state = {
            timerOn: false,
            timerDuration: 0,
            buttonText: 'Start Stop Watch',
            buttonClass: 'btn btn-start',
            time: {
                seconds: '00',
                minutes: '0'
            },
            secondOffset: 0,
            laps: []
        }
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetWatch = this.resetWatch.bind(this);
        this.lap = this.lap.bind(this);
    }

    toggleTimer(){
        if(this.state.timerOn === false){
            timerInt = setInterval(
                () => this.tick(),1000
            );
            this.setState({
                timerOn: true,
                buttonText: 'Pause Timer',
                buttonClass: 'btn btn-stop'
            })

        } else {
            clearInterval(timerInt);
            this.setState({
                timerOn: false,
                buttonText: 'Continue Timer',
                buttonClass: 'btn btn-start'
            })
        }
    }

    tick(){
        var currentSeconds = parseFloat(this.state.time['seconds']);
        var newSeconds = (parseInt(currentSeconds, 10) + 101).toString().substr(1);
        var percentage = (newSeconds/60) * 100
        if(newSeconds === '60'){
            var currentMin = parseFloat(this.state.time['minutes']);
            this.setState(prevState => ({
                time: {
                    seconds: '00',
                    minutes: currentMin + 1
                },
                secondOffset: percentage
            }))
        } else {
            this.setState(prevState => ({
                time: {
                    ...prevState.time,
                    seconds: newSeconds
                },
                secondOffset: percentage
            }))
        }
        this.setState({
            timerDuration: this.state.timerDuration + 1
        })
    }

    lap(){
        var newLap = {
            id: this.state.laps.length + 1,
            time: this.state.time['minutes'] + ":" + this.state.time['seconds']
        }
        var allLaps = this.state.laps.slice();
        allLaps.unshift(newLap);
        this.setState({
            laps: allLaps
        })
    }

    resetWatch(){
        this.setState({
            timerDuration: 0,
            buttonText: 'Start Stop Watch',
            buttonClass: 'btn btn-start',
            time: {
                seconds: '00',
                minutes: '0'
            },
            laps: [],
            secondOffset: 0
        })
    }

    render() {
        let { buttonText, buttonClass, laps } = this.state;
        let button;
        if( (this.state.timerOn === false) && (this.state.timerDuration > 0) ){
            button = <button className="btn btn-reset" onClick={this.resetWatch}>Reset Stop Watch</button>;
        } else if(this.state.timerOn === true){
            button = <button className="btn btn-lap" onClick={this.lap}>Lap</button>;
        }
        const style = {
          strokeDashoffset: 'calc(314.1592% * ('+this.state.secondOffset+' / 100))'
        }
        return (
            <div id="App">
                <div className="container">
                    <div id="clock">
                        <div className="secondsRadial" data-percentage="75">
                            <svg viewport="0 0 2000 2000">
                                <circle className="bars" r="50%" cx="50%" cy="50%"></circle>
                                <circle
                                    className="bars"
                                    r="50%"
                                    cx="50%"
                                    cy="50%"
                                    style={style}
                                    ></circle>
                            </svg>
                        </div>
                        <h2 className="time">{this.state.time['minutes']}:{this.state.time['seconds']}</h2>
                    </div>
                    <div className="buttons">
                        <button className={buttonClass} onClick={this.toggleTimer} >{buttonText}</button>
                        {button}
                    </div>
                    {laps.length ? (
                        <table id="lapTable">
                            <thead>
                                <tr>
                                    <th>Lap</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody className="border-bottom">
                                {
                                    this.state.laps.map(lap => {
                                        return <tr key={lap.id}>
                                            <td>{lap.id}</td>
                                            <td>{lap.time}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    ):null}
                </div>
            </div>
        );
    }
}

export default App;
