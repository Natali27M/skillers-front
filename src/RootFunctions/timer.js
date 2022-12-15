import {useEffect, useState} from 'react';

export default function useTimer(startTime) {
    const [time, setTime] = useState(startTime);
    const [intervalID, setIntervalID] = useState(null);
    const hasTimerEnded = time <= 0;
    const isTimerRunning = intervalID != null;

    const update = () => {
        setTime(time => time - 1);
    };
    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000));
        }
    };
    const stopTimer = () => {
        clearInterval(intervalID);
        setIntervalID(null);
    };

    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }, [hasTimerEnded]);

    useEffect(() => () => {
        clearInterval(intervalID);
    }, []);
    return {
        time,
        startTimer,
        stopTimer,
        setTime
    };
}