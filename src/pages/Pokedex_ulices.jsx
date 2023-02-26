import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
// import './styles/Pokedex.css'
const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [selectType, setSelectType] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const nameTrainer = useSelector(store => store.nameTrainer)
  
  const handleChangeSelect = (e) => {
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const paginationLogic = () => {
    // Cantidad de pokemons por paginas.
    const pokemonPerPage = 12;
    
    // Pokemon que se mostraran en la pagina actual.
    const sliceStart = (currentPage - 1) * pokemonPerPage
    const sliceEnd = sliceStart + pokemonPerPage
    const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)
    
    // última página.
    const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1
    
    // Bloque Actual.
    const pagesPerBlock = 8;
    const actualBlock = Math.ceil(currentPage / pagesPerBlock)
    
    // Paginas que se van a mostrar en la bloque actual.
    const pagesInBlock = []
    const minPages = (actualBlock * pagesPerBlock - pagesPerBlock) + 1
    const maxPages = actualBlock * pagesPerBlock
    for (let i = minPages; i <= maxPages; i++) {
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }

    return {pagesInBlock, lastPage, pokemonsInPage}
  }

  const {pagesInBlock, lastPage, pokemonsInPage} = paginationLogic()
  
  const handleNextPage = () => {
    const nextPage = currentPage + 1
    if(nextPage > lastPage){
      setCurrentPage(1)
    }else{
      setCurrentPage(nextPage)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if(newPage < 1){
      setCurrentPage(lastPage)
    }else{
      setCurrentPage(newPage)
    }
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : 'pokemon/?limit=1279'}`
    axios.get(URL)
    .then((res) => {
      if(selectType){
        const pokemonByType = res.data.pokemon.map(pokemon => {
          return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url
          }
        })
        setPokemons(pokemonByType)
      }else{
        setPokemons(res.data.results)
      }
    })
    .catch((err) => console.log(err))
  },[selectType])

  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLocaleLowerCase()))
    setPokemonsFilter(pokemonByName)
  }, [pokemonName, pokemons])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type/'
    axios.get(URL)
    .then((res) => setTypes(res.data.results))
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])

  return (
    <main className='pokedex'>
      <p className='pokedex__welcome'>Welcome<span className='pokedex__nameTrainer'> {nameTrainer}</span>, here you can find information about of your favorite pokemon </p>
      <form className='pokedex__form' onSubmit={handleSubmit}>
        <div className='pokedex__form-conteiner'>
          <input className='pokedex__input' type="text" id='pokemonName' placeholder='Search your pokemon'/>
          <button className='pokedex__btn'><i className='bx bx-search'></i></button>
        </div>
        <select className='pokedex__select' onChange={handleChangeSelect}>
          <option value="">All</option>
          {
            types.map(type => <option className='pokedex__option' key={type.url}>{type.name} </option>)
          }
        </select>
      </form>
            {/* Paginación superior */}
      <section className='pokedex__pagination'>
        <ul className='pokedex__ul'>
          <li onClick={handlePreviousPage}>{'<<'}</li>
          <li onClick={() => setCurrentPage(1)}>...</li>
        {
          pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
        }
        <li onClick={() => setCurrentPage(lastPage)}>...</li>
        <li onClick={handleNextPage}>{'>>'}</li>
        </ul>
      </section>
            {/* Paginación superior */}
      <section className='pokedex__card'>
        {
          pokemonsInPage.map(pokemon => (<PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />))
        }
      </section>
      <section className='pokedex__pagination'>
        <ul className='pokedex__ul'>
          <li onClick={handlePreviousPage}>{'<<'}</li>
          <li onClick={() => setCurrentPage(1)}>...</li>
        {
          pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
        }
        <li onClick={() => setCurrentPage(lastPage)}>...</li>
        <li onClick={handleNextPage}>{'>>'}</li>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex