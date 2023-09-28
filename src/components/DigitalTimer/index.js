import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInMinutes: 25, timeInSeconds: 0}

  componentWillUnmount() {
    this.clearInterval(this.intervalId)
  }

  onDecrementTimer = () => {
    const {time} = this.state
    if (time > 0) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  onIncrementTimer = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false, timeInMinutes: 25, timeInSeconds: 0})
  }

  startTimerOrPause = () => {
    const {timeInMinutes, timeInSeconds, isTimerRunning} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timeInMinutes, isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="modify-container">
            <div className="states-containers">
              <div className="icon-state-container">
                <button
                  className="icon-button"
                  type="button"
                  onClick={this.startTimerOrPause}
                >
                  <img
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                    className="icon"
                  />
                </button>
                <h1 className="state-name">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </h1>
              </div>
              <div className="icon-state-container">
                <button
                  className="icon-button"
                  type="button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <h1 className="state-name">Reset</h1>
              </div>
            </div>
            <p className="set-timer-para">Set Timer Limit</p>
            <div className="plus-minus-number-container">
              <button
                className="minus-button"
                type="button"
                onClick={this.onDecrementTimer}
              >
                -
              </button>
              <button className="number-button" type="button">
                {timeInMinutes}
              </button>
              <button
                className="minus-button"
                type="button"
                onClick={this.onIncrementTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
