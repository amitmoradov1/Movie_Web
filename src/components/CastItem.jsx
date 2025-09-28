import React from 'react'
import style from '../styles/CastItem.module.css'
export default function CastItem(props) {
return (
  <div className={style['cast-item']}>
      <div className={style['cast-image']}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={style['cast-info']}>
        <div className={style['cast-actorName']}>{props.name}</div>
        {props.character && (
          <div className={style['cast-characterName']}>{props.character}</div>
        )}
      </div>
    </div>
)
}
