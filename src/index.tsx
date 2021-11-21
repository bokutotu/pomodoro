import ReactDOM from 'react-dom';
import useTimer  from './useTimer';

type timerProps = {
  isRunning: boolean
  seconds: number;
  minutes: number;
  hours: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date) => void;
}

const ShowTimer = (props: timerProps) => {

  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{fontSize: '100px'}}>
        <span>{ props.hours }</span>:<span>{ props.minutes }</span>:<span>{ props.seconds }</span>
      </div>
      <p>{props.isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={props.start}>Start</button>
      <button onClick={props.pause}>Pause</button>
      <button onClick={props.resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        props.restart(time)
      }}>Restart</button>
    </div>
  );
}

type myTimerState = {
  expiry: Date,
}

function MyTimer(props: myTimerState) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer(props.expiry, () => console.warn('onExpire called'));

  return (
    <ShowTimer isRunning={isRunning} hours={hours} minutes={minutes}
      seconds={seconds} start={start} pause={pause} resume={resume}
      restart={restart} />
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      <MyTimer expiry={time} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))