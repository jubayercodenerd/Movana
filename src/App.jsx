import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import React, {useEffect, useState} from "react";
import MoviePlayer from "./MoviePlayer/MoviePlayer.jsx";
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
const genres = JSON.parse(localStorage.getItem('genres'));

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileDir, setProfileDir] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [search, setSearch] = React.useState("");
    const loginBaseUrl = "http://localhost:3000/Users";
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
            if (user) {
                const data = JSON.parse(user);
                const password = data.password;
                const email = data.email;
                fetchUser(email,password);
                console.log(password);
                console.log(email);
            }
            fetchGenres();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            if(JSON.parse(localStorage.getItem("currentMovie")) !== undefined) {
                setCurrentMovie(JSON.parse(localStorage.getItem("currentMovie")))
            }
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

    const fetchUser = async (email,password) => {
        const response = await fetch(`${loginBaseUrl}?email=${email}&password=${password}`);
        const data = await response.json();
        if(data.length === 1 && data[0].email === email && data[0].password === password) {
            setIsLoggedIn(true);
            setProfileDir(data[0].profilePicture);
        }
        else setIsLoggedIn(false);
    }
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage genres={genres} search={search} setSearch={setSearch} setCurrentMovie={setCurrentMovie} profileDir={profileDir} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
            <Route path="/login" element={<LoginPage setProfielDir={setProfileDir} setIsLoggedIn = {setIsLoggedIn}/>}/>
            <Route path="/player" element={<MoviePlayer movie={currentMovie} profileDir={profileDir} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
        </Routes>
    </>
  )
}

export default App
