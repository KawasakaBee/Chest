import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";


interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  swapPlayer: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, restart, swapPlayer }) => {
  const gameTime: number = 300;

  const [whiteTime, setWhiteTime] = useState(gameTime);
  const [blackTime, setBlackTime] = useState(gameTime);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  useEffect(() => {
    if (whiteTime === 0) resetGame('White')
    if (blackTime === 0) {
      swapPlayer();
      resetGame('Black')
    }
  }, [whiteTime, blackTime])

  function resetGame(color: string) {
    if (timer.current) clearInterval(timer.current);
    alert(`${color} lost`);
    setWhiteTime(gameTime);
    setBlackTime(gameTime);
    restart();
    startTimer();
  }

  function startTimer() {
    if (timer.current) clearInterval(timer.current);

    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>
          Restart game
        </button>
        <h2>Чёрные - {blackTime}</h2>
        <h2>Белые - {whiteTime}</h2>
      </div>
    </div>
  )
}
