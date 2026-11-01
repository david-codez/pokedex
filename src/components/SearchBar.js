import React, { useState } from 'react'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import { toast } from 'react-toastify'

const SearchBar = (props) => {

    const [userInput, setUserInput] = useState(1)

    const handleUserInput = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(userInput < 1 || userInput > 905) {
            toast.error("The pokemon number entered is invalid")
            props.retrieveCurrentPokemon(1)
            setUserInput(1)
            return
        }
        else {
        props.retrieveCurrentPokemon(userInput)
        setUserInput(userInput)
        }
    }
    const handleForwardButton = (e) => {
        if(userInput === 905) {
            toast.error("This is the last pokemon on the list")
            return
        }
        else {

            let newId = parseInt(userInput) + 1
            props.retrieveCurrentPokemon(newId)
            setUserInput(newId)
        }

    }

    const handleBackwardButton = (e) => {

        if(userInput === 1) {
            toast.error("This is the first pokemon on the list")
            return
        }
        else {
            let newId = parseInt(userInput) - 1
            props.retrieveCurrentPokemon(newId)
            setUserInput(newId)
        }

    }



  return (
    <div className='search-bar'>
        <button
            className='pokemon-scroll-buttons'
            type='button'
            onClick={handleBackwardButton}
            aria-label='Previous Pokémon'
        >
            <FaArrowLeft aria-hidden='true' />
        </button>
        <form className='pokemon-id-search-form' onSubmit={handleOnSubmit}>
            <label className='visually-hidden' htmlFor='pokemon-id-input'>Pokédex number, 1 to 905</label>
            <input
                id='pokemon-id-input'
                type='number'
                min='1'
                max='905'
                inputMode='numeric'
                placeholder="#"
                className='pokemon-id-input-field'
                onChange={handleUserInput}
                value={userInput}
                />
            <button type='submit' className='search-button'>Go</button>
        </form>
        <button
            className='pokemon-scroll-buttons'
            type='button'
            onClick={handleForwardButton}
            aria-label='Next Pokémon'
        >
            <FaArrowRight aria-hidden='true' />
        </button>
    </div>
  )
}

export default SearchBar
