import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import React, {useEffect, useState} from "react";
import MoviePlayer from "./MoviePlayer/MoviePlayer.jsx";
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
const genres = JSON.parse(localStorage.getItem('genres'));

function App() {
    const [currentMovie, setCurrentMovie] = useState(null);
    const [search, setSearch] = React.useState("");
    const genresBaseUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ApiKey}`
        }
    };



    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        try {
            fetchGenres();
        }
        catch (error) {
            console.log(error);
        }
        finally {
                setCurrentMovie(JSON.parse(localStorage.getItem("currentMovie")))
        }
    },[])

    useEffect(() => {
        console.log(currentMovie);
        if(currentMovie){
            localStorage.setItem("currentMovie", JSON.stringify(currentMovie));
        }
    },[currentMovie])

    const fetchGenres = async () => {
        const response = await fetch(genresBaseUrl, options);
        const data = await response.json();
        // console.log(data);
        localStorage.setItem("genres", JSON.stringify(data));
    }
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage genres={genres} search={search} setSearch={setSearch} setCurrentMovie={setCurrentMovie}/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/player" element={<MoviePlayer movie={currentMovie}/>}/>
        </Routes>
    </>
  )
}

export default App

