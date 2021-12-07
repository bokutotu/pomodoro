import React from 'react';
import { useState, useEffect } from 'react';

const zeroPadding = (num: number,length: number) => {
  return ('0000000000' + num).slice(-length);
}

const minutesSeconds = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60);
  const seconds = Math.floor(milliseconds - minutes * 60);
  return [minutes, seconds];
}

const runingCheck = (remainSeconds: number) => {
  return remainSeconds > 0;
}

type timerShowProps = {
  remainSeconds: number;
  setRemainSeconds: (value: number) => void;
  isRuning: boolean;
  setIsRuning: (value: boolean) => void;
}

const TimerShow = (
  { remainSeconds, setRemainSeconds, isRuning, setIsRuning }: timerShowProps
) => {
  const step = () => {
    setIsRuning(runingCheck(remainSeconds));
    if (isRuning) {
      setRemainSeconds(remainSeconds - 1);
    }
  };

  console.log("here");

  useEffect(() => {
    const intervalId = setInterval(() => step(), 1000);
    return () => clearInterval(intervalId);
  });

  const remainTime = minutesSeconds(remainSeconds);

  return (
    <div>
      <div>
        { zeroPadding(remainTime[0], 2) }:{ zeroPadding(remainTime[1], 2) }
      </div>
      <div>
        <button onClick={() => {
          setIsRuning(!isRuning);
        }}>{isRuning? "停止" : "開始"}</button>
      </div>
    </div>
  );
}

const App = () => {
  const [remainSeconds, setRemainSeconds] = useState(5 * 60);
  const [isRuning, setIsRuning] = useState(true);
  return (
    <div>
      <div>ポモドーロ</div>
      <TimerShow
        remainSeconds={remainSeconds}
        setRemainSeconds={setRemainSeconds}
        isRuning={isRuning} setIsRuning={setIsRuning}
      />
    </div>

  )
}

export default App