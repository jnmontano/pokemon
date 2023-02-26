import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/Pokemon.css'
const Pokemon = () => {
  const [pokemon, setPokemon] = useState()
  const {id} = useParams()
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
    .then((res) => setPokemon(res.data))
    .catch((err) => console.log(err))
  }, [])
  return (
    <main className='pokemon'>
                                            {/* parte superior  */}
      <section className='pokemon__header'>
        <section className='pokemon__img-body'>
          <div className='pokemon__img'>
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </div>
        </section>
      </section>
                                                  {/* Body */}
    <section className='pokemon__body-id'>
        <h2 className='pokemon__id'># {pokemon?.id}</h2>
        <h2 className='pokemon__name'>{pokemon?.name}</h2>
        {/* Peso y altura */}
        <div className='pokemon__data'>
          <div>
            <h5>Weigth</h5>
            <h4>{pokemon?.weight}</h4>
          </div>
          <div>
            <h5>heigth</h5>
            <h4>{pokemon?.height}</h4>
          </div>
        </div>
        {/* Información del tipo de pokemon */}
        <div className='pokemon__info'>
          <div className='pokemon-conteiner'>
            <h3 className='pokemon__info-title'>Type</h3>
            <div className='pokemon__info-conteiner-text'>
            {
              pokemon?.types.map(type => <div className='pokemon__info-text' key={type.type.name}><span>{type.type.name}</span></div> )
            }
            </div>
          </div>
          <div className='pokemon-conteiner'>
            <h3 className='pokemon__info-title'>Abilities</h3>
            <div className='pokemon__info-conteiner-text'>
            {
              pokemon?.abilities.map(ability => <div className='pokemon__info-text' key={ability.ability.name}><span>{ability.ability.name}</span></div>)
            }
            </div>
          </div>
        </div>
                                                  {/* Stats */}
        <section className='pokemon__stats'>
          <h2 className='pokemon__stats-title'>Stats</h2>
          <section className='pokemon__stats-conteiner'>
            {
              pokemon?.stats.map(stat => (
              <article className='pokemon__stats-score' key={stat.stat.name}>
                  <div className='pokemon__stats-name'>
                    <h4 className='pokemon__stats-name-title'>{stat.stat.name}</h4>
                    <h5 className='pokemon__stats-name-subtitle'>{stat.base_stat}/150</h5>
                  </div>
                  {/* Barra de poder */}
                  <div className='pokemon__power'>
                    <div className='pokemon__power-conteiner'>
                      <div className='pokemon__power-nivel'></div>
                    </div>
                  </div>
              </article>
              ))
            }
          </section>
        </section>
      </section>
    </main>
  )
}
export default Pokemon