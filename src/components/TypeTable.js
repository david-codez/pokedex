import React from 'react'

const TypeTable = (props) => {
    let pokeTypes = props.pokeTypes

  return (
    <ul className='type-table' aria-label='Types'>
        {pokeTypes.map((type) => (
            <li className={`type-pill type-${type.type.name}`} key={type.slot}>
                {type.type.name}
            </li>
        ))}
    </ul>
  )
}

export default TypeTable
