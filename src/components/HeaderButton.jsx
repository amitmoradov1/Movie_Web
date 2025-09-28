import React from 'react'
import style from '../styles/HeaderButton.module.css'

export default function HeaderButton({func, name}) {
  return (
 <div className={style["header-button-container"]}>
      <button 
        className={style['header-button']}
        onClick={func}
      >
        {name}
      </button>
    </div>
  )
}
