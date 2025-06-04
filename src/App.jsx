import './App.css'
import HomePage from './HomePage/HomePage.jsx'
import {Route, Router, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn = {isLoggedIn}/>}/>
            <Route path="/login" element={<LoginPage setIsLoggedIn = {setIsLoggedIn}/>}/>
        </Routes>
    </>
  )
}

export default App
