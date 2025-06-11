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
                    <div onClick={() => {
                        setIsMenuModalVisible(!isMenuModalVisible)
                    }} className="h-[70%] aspect-square rounded-full border-2 border-white overflow-hidden cursor-pointer">
                        <img src={profileDir?profileDir:'/public/profile-pictures/default.jpg'} alt=""/>
                    </div>
                ) : (
                    <Link to="/login">
                        <button
                            onMouseOver={() => setSignInHovered(true)}
                            onMouseLeave={() => setSignInHovered(false)}
                            className={`h-[40px] w-[110px] ${signInHovered ? 'bg-gradient-to-r to-blue-800 from-purple-800' : 'bg-gradient-to-r from-blue-900 to-purple-900'} 
                            transition-colors duration-200 ease-in-out cursor-pointer rounded-full flex items-center justify-center max-md:h-[35px] max-md:w-[90px]`}
                        >
                            <p className="bg-clip-text text-xl text-transparent font-bold bg-white max-md:text-lg">
                                Sign In
                            </p>
                        </button>
                    </Link>
                )
            }
            {
                isMenuModalVisible?<>
                    <div    onMouseOver={()=>setIsMenuModalVisible(true)} onMouseLeave={()=>setIsMenuModalVisible(false)}
                        className={"absolute top-[60px] w-[120px] flex flex-col items-center justify-center gap-[2px] bg-black rounded-xl overflow-hidden"}>
                        {
                            !isLoggedIn ? <></>:<button onClick={ () => { setIsLoggedIn(false); localStorage.removeItem("user"); setIsMenuModalVisible(false)}} className={"h-[40px] w-full bg-gradient-to-r from-blue-950 to-purple-950 text-sm font-semibold text-gray-200 cursor-pointer"}>Log Out</button>
                        }
                    </div>
                </>:<></>
            }
        </nav>
    );
};

export default Navbar;
