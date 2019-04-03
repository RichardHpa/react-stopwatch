import React, { Component } from 'react';
import './App.css';
var timerInt;

class App extends Component {
    constructor(){
        super();
        this.state = {
            timerOn: false,
            timerDuration: 0,
            buttonText: 'Start Stop Watch',
            buttonClass: 'btn btn-primary',
            time: {
                seconds: '00',
                minutes: '0'
            }
        }
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetWatch = this.resetWatch.bind(this);
    }

    toggleTimer(){
        if(this.state.timerOn === false){
            timerInt = setInterval(
                () => this.tick(),1000
            );
            this.setState({
                timerOn: true,
                buttonText: 'Stop Timer',
                buttonClass: 'btn btn-warning'
            })

        } else {

            clearInterval(timerInt);
            this.setState({
                timerOn: false,
                buttonText: 'Continue Timer',
                buttonClass: 'btn btn-primary'
            })
        }
    }

    tick(){
        var currentSeconds = parseFloat(this.state.time['seconds']);
        var newSeconds = (parseInt(currentSeconds, 10) + 101).toString().substr(1);
        if(newSeconds === '60'){
            var currentMin = parseFloat(this.state.time['minutes']);
            this.setState(prevState => ({
                time: {
                    seconds: '00',
                    minutes: currentMin + 1
                }
            }))
        } else {
            this.setState(prevState => ({
                time: {
                    ...prevState.time,
                    seconds: newSeconds
                }
            }))
        }
        this.setState({
            timerDuration: this.state.timerDuration + 1
        })


    }

    resetWatch(){
        this.setState({
            timerDuration: 0,
            buttonText: 'Start Stop Watch',
            buttonClass: 'btn btn-primary',
            time: {
                seconds: '00',
                minutes: '0'
            }
        })
    }


  render() {
      let { buttonText, buttonClass } = this.state;
      let button;
      if( (this.state.timerOn === false) && (this.state.timerDuration > 0) ){
          button = <button className="btn btn-danger" onClick={this.resetWatch}>Reset Stop Watch</button>;
      }

    return (
      <div className="d-flex align-items-center h-100 bg-dark">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card text-center">
                        <h1 className="display-4">Stop Watch</h1>
                        <h2 className="display-2">{this.state.time['minutes']}:{this.state.time['seconds']}</h2>
                        <button className={buttonClass} onClick={this.toggleTimer} >{buttonText}</button>
                        {button}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
