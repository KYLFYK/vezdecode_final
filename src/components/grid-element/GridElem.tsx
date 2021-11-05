import { FC } from 'react'

import styles from './GridElem.module.scss'

interface Props {
  name?: string
  isWinner?: boolean
  onClick?: () => void
}

export const GridElem: FC<Props> = ({ name, isWinner, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.element} ${isWinner && styles.winner}`}
    >
      <span>{name}</span>
    </div>
  )
}
