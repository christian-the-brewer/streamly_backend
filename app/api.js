import axios from "axios";
import "dotenv/config"

//movie api calls
const showMovieUrl = "https://api.themoviedb.org/3/movie/";
const discoverMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_TOKEN}&query=`

//api key
const apiKey = `?api_key=${process.env.API_TOKEN}`

//languages
const languageCode = "&language=en-US"

//fetch requests

//Most popular by region
export const fetchPopularMovies = (region) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

//By ID
export const fetchMovieById = (id) => {
    console.log(`This is the fetch movie url ${showMovieUrl}${id}${apiKey}${languageCode}`)
    return axios({
        url: `${showMovieUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

