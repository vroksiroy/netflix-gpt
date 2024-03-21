import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()

    const nowPlayingMovies = useSelector(state => state.movies?.nowPlayingMovies)
    const getNowPlayingMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS)
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
        console.log(json.results);
    }

    useEffect(()=>{
        !nowPlayingMovies && getNowPlayingMovies()
    },[])
}

export default useNowPlayingMovies