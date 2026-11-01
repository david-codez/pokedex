import React from 'react'
import logo from '../Images/pokemon-logo.png'

const Nav = () => {
  return (
    <a className="dex-brand" href="/#">
      <img
        alt="Pokémon Pokédex"
        src={logo}
        className="pokemon-logo"
      />
    </a>
  )
}

export default Nav
