import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import reactRefresh from "eslint-plugin-react-refresh";

const Navbar = ({setIsLoggedIn, isLoggedIn, profileDir, setSearch}) => {
    const [signInHovered, setSignInHovered] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const handleScroll = () => {
            if(scrollY > 400){
                setIsVisible(false);
            }
            else setIsVisible(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    },[])

    return (
        <nav className={`fixed top-0 z-50 h-[60px] w-full px-6 flex items-center justify-end bg-gradient-to-b from-gray-950 to-transparent max-md:h-[50px] ${!isVisible ? 'hidden' : ''}`} >

            {
                isLoggedIn ? (
                    <div className="h-[70%] aspect-square rounded-full border-2 border-white overflow-hidden">
                        <img src={profileDir?profileDir:'/public/profile-pictures/default.jpg'} alt=""/>
                    </div>
                ) : (
                    <Link to="/login">
                        <button
                            onMouseOver={() => setSignInHovered(true)}
                            onMouseLeave={() => setSignInHovered(false)}
                            className={`h-[40px] w-[110px] ${signInHovered ? 'bg-[rgba(230,0,0,.5)]' : 'bg-[rgba(230,20,20,.6)]'} cursor-pointer rounded-full flex items-center justify-center`}
                        >
                            <p className="bg-clip-text text-xl text-transparent font-bold bg-gradient-to-b from-blue-200 to-white">
                                Sign In
                            </p>
                        </button>
                    </Link>
                )
            }
            <button onClick={() => {
                setIsMenuModalVisible(!isMenuModalVisible)
            }}
                className={"h-[40px] flex items-center justify-center overflow-hidden ml-[10px]"}>
                <img className={"h-full w-full filter invert cursor-pointer"} src="/public/project-images/menu.svg" alt="menu-icon"/>
            </button>
            {
                isMenuModalVisible?<>
                    <div    onMouseOver={()=>setIsMenuModalVisible(true)} onMouseLeave={()=>setIsMenuModalVisible(false)}
                        className={"absolute top-[60px] w-[120px] flex flex-col items-center justify-center gap-[2px] bg-black rounded-xl overflow-hidden"}>
                        <button className={"h-[40px] w-full bg-[rgba(230,0,0,.3)] text-sm font-semibold text-gray-200 cursor-pointer"}>Home</button>
                        <button className={"h-[40px] w-full bg-[rgba(230,0,0,.3)] text-sm font-semibold text-gray-200 cursor-pointer"}>Genres</button>
                        <button className={"h-[40px] w-full bg-[rgba(230,0,0,.3)] text-sm font-semibold text-gray-200 cursor-pointer"}>years</button>
                        {
                            !isLoggedIn ? <></>:<button onClick={ () => { setIsLoggedIn(false); localStorage.removeItem("user"); setIsMenuModalVisible(false)}} className={"h-[40px] w-full bg-[rgba(230,0,0,.3)] text-sm font-semibold text-gray-200 cursor-pointer"}>Log Out</button>
                        }
                    </div>
                </>:<></>
            }
        </nav>
    );
};

export default Navbar;
