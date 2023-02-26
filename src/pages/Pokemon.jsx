import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {
  const [pokemon, setPokemon] = useState()
    
  const {id} = useParams()  
    
  const getPercentBar = (stat) => {
    const percent = (stat * 100) / 255;
    return `${percent}%`;
  };
    
    useEffect(() => {  
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
      axios
        .get(URL)
        .then((res) => setPokemon(res.data) )
        .catch((err) => console.log(err))
    }, [])

  return (
    <main className='pokemon'>

{/* 

<article className={`pokemonCard border-${pokemon?.types[0].type.name}`} onClick={handleClickPokemon}>
      <section className={`pokemonCard__header bg-lg-${pokemon?.types[0].type.name}`}></section>
*/}

      <section className={`pokemon bg-lg-${pokemon?.types[0].type.name} border-${pokemon?.types[0].type.name}`}>
        {/* parte superior */}
        <section className='pokemon__main'>
          <div className='pokemon__image'>
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
        </section>

        {/* body */}
        <section>
          <h2 className='pokemon__id'># {pokemon?.id}</h2>
          <section className='pokemon__name'>
            <div className='pokemon__line'></div>
            <p>{pokemon?.name}</p>
            <div className='pokemon__line'></div>
          </section>

          <div className='pokemon__features'>
            <div>
              <h5>Weight</h5>
              <h4>{pokemon?.weight}</h4>
            </div>
            <div>
              <h5>Height</h5>
              <h4>{pokemon?.height}</h4>
            </div>
          </div>

          <div className='pokemon__characteristics'>
            <div className='pokemon_abilities'>
              <h3>Type</h3>
              <div>
                {pokemon?.types.map((type) => (
                  <div className='type' key={type.type.name}>
                    <span className={type.type.name}>{type.type.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='pokemon_abilities'>
              <h3>Abilities</h3>
              <div>
                {pokemon?.abilities.map((ability) => (
                  <div className='abilitie' key={ability.ability.name}>
                    <span>{ability.ability.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* stats */}
          <section className="pokemon__stats">
            <h2 className="pokemon__stats-title">stats</h2>
            <section>
              {pokemon?.stats.map((stat) => (
                <article className='pokemon__stat-group' key={stat.stat.name}>
                  <div className="pokemon__stat-tittle">
                    <h4>{stat.stat.name}</h4>
                    <h5>{stat.base_stat}/255</h5>
                  </div>
                  <div>
                    <div className="pokemon__stat-barGray">
                      <div className="pokemon__stat-barProgress" style={{ width: getPercentBar(stat.base_stat) }} ></div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </section>
      </section>


    </main>
  );
}

export default Pokemon