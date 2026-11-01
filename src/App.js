import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import PokemonDetail from './components/PokemonDetail';
import {getPokemon} from './functions/pokeFunctions'
import {ToastContainer, toast} from 'react-toastify'

function App() {

  const [loaded, setLoaded] = useState(false)
  const [pokemon, setPokemon] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState(1)
  const [pokemonDescription, setPokemonDescription] = useState('')
  const [pokemonGenus, setPokemonGenus] = useState('')


  const retrieveCurrentPokemon = async (id) => {
      try {
          let poke = await getPokemon(id)
          setPokemon(poke.pokemon)
          setPokemonDescription(poke.description)
          setPokemonGenus(poke.genus)
          setCurrentPokemon(id)
          setLoaded(true)
      } catch (error) {
          console.error(error)
          toast.error(`Couldn't load Pokémon #${id}. Check your connection and try again.`)
      }
  }

  useEffect(() => {
      retrieveCurrentPokemon(currentPokemon)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <div className="App">
      <header className="dex-bar">
        <Nav />
        <SearchBar retrieveCurrentPokemon={retrieveCurrentPokemon} />
      </header>

      <main className="dex-canvas">
        {
          loaded === true
            ? <PokemonDetail pokemon={pokemon} description={pokemonDescription} genus={pokemonGenus} />
            : <PokemonDetail.Loading />
        }
      </main>
      <ToastContainer position="bottom-center" hideProgressBar />
    </div>
  );
}

export default App;
