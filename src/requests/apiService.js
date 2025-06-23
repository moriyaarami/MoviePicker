import { useState } from "react";

const API_KEY = 'ffcd1f15eb5075c738d7499f43e5a56e';
const BASE_URL = 'https://api.themoviedb.org/3';
const HEADER_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmNkMWYxNWViNTA3NWM3MzhkNzQ5OWY0M2U1YTU2ZSIsIm5iZiI6MTc1MDM0NTc1Ni4yODQ5OTk4LCJzdWIiOiI2ODU0MjgxYzk4ZjQ4YmVhMGM5NTViOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pFOl46t7ODcY5KI8KclDWKd45jH6Tb4jlUgSHxUDbgw'

export async function GetRandomMovie() {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${randomPage}$video==true`

    try {
        const resopnse = await fetch(url);
        const data = await resopnse.json();
        const movies = data.results;

        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex]

        return randomMovie;
    } catch (err) {
        console.error(err)
    }
}



export async function GetGener(ids = []) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmNkMWYxNWViNTA3NWM3MzhkNzQ5OWY0M2U1YTU2ZSIsIm5iZiI6MTc1MDM0NTc1Ni4yODQ5OTk4LCJzdWIiOiI2ODU0MjgxYzk4ZjQ4YmVhMGM5NTViOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pFOl46t7ODcY5KI8KclDWKd45jH6Tb4jlUgSHxUDbgw'
        }
    };
    try {
        const resopnse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        const data = await resopnse.json();
        const genres = data.genres;

        const filteredGenres = ids.map((id) => {
            return genres.find((genre) => genre.id === id);
        });

        return [filteredGenres, genres]
    } catch (err) {
        console.log(err)
    }

}

export async function filterSearch(genre, year, rate) {
    console.log(genre)
    const randomPage = Math.floor(Math.random() * 5) + 1;

    const url = `${BASE_URL}/discover/movie?language=en-US&page=${randomPage}&primary_release_year=${year}&vote_average.gte=${rate}&with_genres=${genre}`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: HEADER_KEY
        }
    };

    try {
        const resopnse = await fetch(url, options)
        const data = await resopnse.json();
        const movies = data.results;

        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex]
        console.log(randomMovie)
        return randomMovie;
    } catch (err) {
        console.error(err)
    }


}
