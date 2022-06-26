import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import { CellComponent } from './CellComponent';

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const BoardComponent: FC<BoardComponentProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  useEffect(() => {
    highLightCells();
  }, [selectedCell])

  function highLightCells() {
    board.highLightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <React.Fragment>
      <h3 className='current-player'>Текущий игрок {currentPlayer?.color === Colors.WHITE ? 'белый' : 'чёрный'}</h3>
      <div className='board'>
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell => <CellComponent click={click} cell={cell} key={cell.id} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />)}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}
