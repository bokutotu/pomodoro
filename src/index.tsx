import ReactDOM from 'react-dom';
import useTimer  from './useTimer';
import SetTimerBottons from './SetRuntime';
import './index.css';

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

const  MyTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 0); // 10 minutes timer

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
  } = useTimer(time, () => console.warn('onExpire called'));

  return (
    <div>
      <div>
        <ShowTimer isRunning={isRunning} hours={hours} minutes={minutes}
          seconds={seconds} start={start} pause={pause} resume={resume}
          restart={restart} />
      </div>
      <div className='bottons'>
        <SetTimerBottons />
      </div>
    </div>
  );
}

export default function App() {
    return (
    <div>
      <MyTimer/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))