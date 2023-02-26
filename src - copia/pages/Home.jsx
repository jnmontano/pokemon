import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slice/nameTrainer.slice'
import "./styles/Home.css"

const Home = () => {

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainerGlobal(nameTrainer))
  }

  return (
    <main className='login'>
      <section className='login__box'>
        <div className='login__image'>
          <img src="/images/pokedex.png" />
        </div>
        <h2 className='login__title'>Hello Coach!</h2>
        <p className='login__giveMe'>Give me your name to start!</p>
        <form className='login__form' onSubmit={handleSubmit}>
          <input className='login__input'
            required
            id="nameTrainer"
            type="text"
            placeholder="your name..."
          />
          <button className='login__btn'>Start</button>
        </form>
      </section>
      <section className='login__footer'>
        <div className='login__footer-blackBox'></div>
        <div className='login__footer-redBox'></div>
        <div className='login_footer-ball'>        
          <img src="/images/pokeball2.png" />
        </div>
      </section>
    </main>
  );
}

export default Home