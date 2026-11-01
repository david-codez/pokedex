import React from 'react'
import StatTable from './StatTable'
import TypeTable from './TypeTable'
import { threeDigitNumber } from '../functions/pokeFunctions'
import SizeTable from './SizeTable'

const PokemonDetail = (props) => {
  let pokeData = props.pokemon
  let description = props.description
  let genus = props.genus
  let primaryType = pokeData.types[0].type.name

  return (
    <article className='pokemon-detail'>
      <div className='title-row'>
        <div>
          <h1 className='pokemon-name'>
            {pokeData.name}
            <span className='pokedex-entry-number'>#{threeDigitNumber(pokeData.id)}</span>
          </h1>
          {genus && <p className='pokemon-genus'>{genus}</p>}
        </div>
        <TypeTable pokeTypes={pokeData.types} />
      </div>

      <div className='detail-grid'>
        <figure className={`artwork-card type-ground-${primaryType}`}>
          <img
            src={pokeData.sprites.other['official-artwork'].front_default}
            alt={`Official artwork of ${pokeData.name}`}
            className='pokemon-image'
            width='475'
            height='475'
          />
        </figure>

        <div className='detail-column'>
          <section className='panel' aria-labelledby='entry-heading'>
            <h2 id='entry-heading' className='panel-title'>Pokédex entry</h2>
            <p className='pokedex-entry'>{description || '—'}</p>
            <SizeTable height={pokeData.height} weight={pokeData.weight} />
          </section>

          <StatTable statTableData={pokeData.stats} />
        </div>
      </div>
    </article>
  )
}

const PokemonDetailLoading = () => (
  <div className='pokemon-detail is-loading' aria-busy='true' aria-label='Loading Pokémon'>
    <div className='title-row'>
      <div>
        <h1 className='pokemon-name'><span className='skeleton skeleton-title' /></h1>
        <p className='pokemon-genus'><span className='skeleton skeleton-line' /></p>
      </div>
    </div>
    <div className='detail-grid'>
      <div className='artwork-card' />
      <div className='detail-column'>
        <section className='panel'>
          <h2 className='panel-title'>Pokédex entry</h2>
          <p className='pokedex-entry'><span className='skeleton skeleton-line' /></p>
        </section>
        <section className='panel'>
          <h2 className='panel-title'>Base stats</h2>
        </section>
      </div>
    </div>
  </div>
)

PokemonDetail.Loading = PokemonDetailLoading

export default PokemonDetail
