import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [busqueda, setBusqueda] = useState("")
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    if (busqueda.length === 0) {
      setPokemon(null)
      return
    }

    const buscarPokemon = async () => {
      try {
        const busquedaMinusculas = busqueda.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${busquedaMinusculas}`);
        if (!response.ok) {
          setPokemon(null)
          throw new Error('Error')
        }
        const data = await response.json()
        setPokemon(data)
      } catch {
        setPokemon(null)
      }
    };

    buscarPokemon()
  }, [busqueda])

  return (
    <>
      <h1>Buscar Pokemon</h1>
      <form>
        <label htmlFor="pokemon">Pokemon: </label>
        <input type="text" placeholder="Nombre del pokemon" id="pokemon" name="pokemon" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </form>

      
      {pokemon !== null &&
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      }
    </>
  )
}

export default App
