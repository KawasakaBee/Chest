import { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellComponentProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export const CellComponent: FC<CellComponentProps> = ({ cell, selected, click }) => {
  return (
    <div onClick={() => click(cell)} className={['cell', cell.color, selected ? 'selected' : '', cell.available && cell.figure ? 'green' : ''].join(' ')}>
      {cell.available && !cell.figure && <div className='available'></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt='figure' />}
    </div>
  )
}
