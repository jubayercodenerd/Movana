import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import {useEffect, useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileDir, setProfileDir] = useState(null);
    const baseUrl = "http://localhost:3000/Users";

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
            const data = JSON.parse(user);
            const password = data.password;
            const email = data.email;
            fetchUser(email,password);

            console.log(password);
            console.log(email);

        }
    },[])

    const fetchUser = async (email,password) => {
        const response = await fetch(`${baseUrl}?email=${email}&password=${password}`);
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
