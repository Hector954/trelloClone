import React from 'react'
import './Appbar.scss'

const Appbar = (props) => {
  const { title } = props
  return (
          <nav className="navbar-app">{title}</nav>
  )
}

export default Appbar