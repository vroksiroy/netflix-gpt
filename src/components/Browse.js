import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';

const Browse = () => {
    const showGptSearch = useSelector(state => state.gpt.showGptSearch)
    useNowPlayingMovies()
    usePopularMovies()

    return (
        <div>
            <Header />
            {showGptSearch ?
                <GptSearch /> :
                <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            }
        </div>
    )
}

export default Browse
