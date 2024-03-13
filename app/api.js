import axios from "axios";
import "dotenv/config"

//This file contains the calls to TMDB API to return movie and tv data

//auth options
const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`
}

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

//most popular by region and platform
// export const fetchPopularMoviesByPlatform = (region, platform) => {
//     return axios({
//         url: `${discoverMovieUrl}&watch_region=${region}&with_watch_providers=${platform}`,
//         method: "GET",
//     })
// };

export const fetchPopularMoviesByPlatform = (region, platform) => {
    return axios({
        url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=${region}&sort_by=popularity.desc&watch_region=${region}&with_watch_providers=${platform}'`,
        method: "GET",
        headers: headers,
    })
}


//By ID
export const fetchMovieById = (id) => {
    return axios({
        url: `${showMovieUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

//Search movies
//Search by title
export const fetchSearchMoviesByTitle = (title) => {
    return axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
        method: "GET",
        headers: headers,
    })
};

//Fetch TV

export const fetchPopularTV = (region) => {
    return axios({
        url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${region}`,
        method: "GET",
        headers: headers,
    })
};

//fetch tv by region and platform
export const fetchPopularTVByPlatform = (region, platform) => {
    return axios({
        url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=${region}&with_watch_providers=${platform}`,
        method: "GET",
        headers: headers,
    })
};

export const fetchTVById = (id) => {
    return axios({
        url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        method: "GET",
        headers: headers,
    })
};

//multisearch that will be the default in navbar. searches movies and shows and people
export const fetchSearchMulti = (term) => {
    return axios({
        url: `https://api.themoviedb.org/3/search/multi?query=${term}&include_adult=false&language=en-US&page=1`,
        method: "GET",
        headers: headers,
    })
};

//fetch person by id
export const fetchPersonById = (id) => {
    return axios({
        url: `https://api.themoviedb.org/3/person/${id}?language=en-US`,
        method: "GET",
        headers: headers,
    })
};

//Fetch list of watch provider
export const fetchWatchProviders = () => {
    return axios({
        url: `https://api.themoviedb.org/3/watch/providers/movie?language=en-US`,
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`
        }
    })
};


//