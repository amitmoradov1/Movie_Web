import React from 'react'
import '../styles/Avatar.css'
export default function Avatar(props) {
  return (
    <div className="profile-item">
      <div className={`avatar ${props.size || 'avatar-sm'}`}>
        <img src={props.image} alt={props.name || "User Avatar"} />
      </div>
      <p className="profile-name">{props.name}</p>
    </div>
  )
}
