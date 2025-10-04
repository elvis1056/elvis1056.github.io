'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import style from './style';

interface ClockProps {
  className?: string;
}

function Clock({ className }: ClockProps) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegree = (hours * 30 + minutes * 0.5) % 360;
  const minuteDegree = (minutes * 6 + seconds * 0.1) % 360;
  const secondDegree = (seconds * 6) % 360;

  if (!mounted) {
    return (
      <div className={className}>
        <div className="clock-container">
          <div className="clock-face">
            <div className="clock-center" />
            <div
              className="clock-hand hour-hand"
              style={{ transform: 'rotate(0deg)' }}
            />
            <div
              className="clock-hand minute-hand"
              style={{ transform: 'rotate(0deg)' }}
            />
            <div
              className="clock-hand second-hand"
              style={{ transform: 'rotate(0deg)' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="clock-container">
        <div className="clock-face">
          <div className="clock-center" />
          <div
            className="clock-hand hour-hand"
            style={{ transform: `rotate(${hourDegree}deg)` }}
          />
          <div
            className="clock-hand minute-hand"
            style={{ transform: `rotate(${minuteDegree}deg)` }}
          />
          <div
            className="clock-hand second-hand"
            style={{ transform: `rotate(${secondDegree}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}

export default styled(Clock)`
  ${style}
`;
