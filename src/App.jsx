import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import {useEffect, useState} from "react";
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileDir, setProfileDir] = useState(null);
    const loginBaseUrl = "http://localhost:3000/Users";
    const genresBaseUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RkOWI5OWNjMWQwYzMxMWVkYzgxOGVhNDU5MjQ2YyIsIm5iZiI6MTc0ODcxNzgxMS43MDEsInN1YiI6IjY4M2I1MGYzOGZmNjVmYzgzOWYyYWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gZitpm-MFDTtJ-BCjXS8Bw0wSeo8LlgpVZdZjyT5i9M'
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


    },[])
    const fetchGenres = async () => {
        const response = await fetch(genresBaseUrl, options);
        const data = await response.json();
        console.log(data);
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
            <Route path="/" element={<HomePage profileDir={profileDir} setIsLoggedIn={setIsLoggedIn} isLoggedIn = {isLoggedIn}/>}/>
            <Route path="/login" element={<LoginPage setProfielDir={setProfileDir} setIsLoggedIn = {setIsLoggedIn}/>}/>
        </Routes>
    </>
  )
}

export default App
