import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

    useNowPlayingMovies()
    usePopularMovies()

    return (
        <div>
            <Header />
            <MainContainer/>
            <SecondaryContainer/>
            {
                /*

                Maincontainer
                    -videobackground
                    -videotitle
                secondarycontainer
                    -movielist * n
                        -cards * n

                */
            }
        </div>
    )
}

export default Browse
