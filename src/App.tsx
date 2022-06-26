import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { BoardComponent } from './components/BoardComponent';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import { LostFigures } from './components/LostFigures';
import { Timer } from './components/Timer';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const whitePlayer = useMemo(() => new Player(Colors.WHITE), []);
  const blackPlayer = new Player(Colors.BLACK);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [whitePlayer])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className='app'>
      <div>
        <Timer currentPlayer={currentPlayer} restart={restart} swapPlayer={swapPlayer} />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
      </div>
      <div>
        <LostFigures title='Чёрные фигуры' figures={board.lostBlackFigure} />
        <LostFigures title='Белые фигуры' figures={board.lostWhiteFigure} />
      </div>
    </div>
  );
};

export default App;
