import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'


const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector(state => state.gpt)

  if(!movieNames) return null
  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
      <div>
        {movieNames.map((name, index) => <MovieList key={index} title={name} movies={movieResults[index]}/>)}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions
