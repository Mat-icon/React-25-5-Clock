import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Session');

  const audioElement = useRef(null);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setSessionType('Session');
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval;

    if (isActive && minutes === 0 && seconds === 0) {
      if (sessionType === 'Session') {
        setMinutes(breakLength);
        setSeconds(0);
        setSessionType('Break');
        if (audioElement.current) {
          audioElement.current.play();
        }
      } else {
        setMinutes(sessionLength);
        setSeconds(0);
        setSessionType('Session');
        if (audioElement.current) {
          audioElement.current.play();
        }
      }
    }

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, sessionType, breakLength, sessionLength]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (sessionType === 'Break') {
        setMinutes(breakLength - 1);
        setSeconds(0);
      }
    }
  };

  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (sessionType === 'Break') {
        setMinutes(breakLength + 1);
        setSeconds(0);
      }
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (sessionType === 'Session') {
        setMinutes(sessionLength - 1);
        setSeconds(0);
      }
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (sessionType === 'Session') {
        setMinutes(sessionLength + 1);
        setSeconds(0);
      }
    }
  };

  return (
    <div className="timer">
      <h1 id="break-label">Break Length</h1>
      <div className="break-controls">
        <button id="break-decrement" onClick={decrementBreakLength}>-</button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={incrementBreakLength}>+</button>
      </div>

      <h1 id="session-label">Session Length</h1>
      <div className="session-controls">
        <button id="session-decrement" onClick={decrementSessionLength}>-</button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={incrementSessionLength}>+</button>
      </div>

      <h2 id="timer-label">{sessionType}</h2>
      <div id="time-left" className="time">
        <span>{formatTime(minutes)}</span>
        <span>:</span>
        <span>{formatTime(seconds)}</span>
      </div>

      <div className="buttons">
        <button id="start_stop" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button id="reset" onClick={resetTimer}>Reset</button>
      </div>

      <audio id="beep" ref={audioElement} src="https://www.soundjay.com/button/beep-07.wav" />
    </div>
  );
};

export default Timer;
