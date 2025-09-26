import React from 'react'
import '../styles/CastItem.css'
export default function CastItem(props) {
  return (
  <div className='cast-item' onClick={props.onClick}>
      <div className='cast-image'>
        <img src={props.image} alt={props.name} />
      </div>
      <div className='cast-info'>
        <div className='cast-actor-name'>{props.name}</div>
        {props.character && (
          <div className='cast-character-name'>{props.character}</div>
        )}
      </div>
    </div>
  )
}
