import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileDir, setProfileDir] = useState(null);
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn = {isLoggedIn}/>}/>
            <Route path="/login" element={<LoginPage setProfielDir={setProfileDir} setIsLoggedIn = {setIsLoggedIn}/>}/>
        </Routes>
    </>
  )
}

export default App
