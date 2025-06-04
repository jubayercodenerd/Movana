import React from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import {useEvent} from "react-use";

const LoginPage = ({setIsLoggedIn}) => {
    const [isNewUser, setIsNewUser] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        if (password !== "") {
            setIsLoggedIn(true);
            navigate("/");
        }
    }
    return (
        <div className={"h-screen w-full bg-gray-900 pt-[20px] flex items-center justify-center p-[20px]"}>
            <form onSubmit={handleLogin} className={"max-w-[600px] w-full bg-gradient-to-r from-pink-400 to-purple-400 flex flex-col justify-center items-center p-[30px] max-md:p-[20px]" +
                " max-w-[600px] ml-auto mr-auto border-2 gap-[10px] rounded-xl "}>
                {
                    isNewUser ? <><input type="text" placeholder={"First Name"} value={firstName} onChange={event => setFirstName(event.target.value)}
                                         className={"w-full p-[10px] h-[40px] border-b-1 focus:outline-none max-md:text-lg"} required={true}/>
                            <input type="text" placeholder={"Last Name"} value={lastName} onChange={event => setLastName(event.target.value)}
                                   className={"w-full p-[10px] h-[40px] border-b-1 focus:outline-none max-md:text-lg"} required={false}/></>
                        :<></>
                }
                <input type="email" value={email} placeholder={"Email"} onChange={event => setEmail(event.target.value)}
                       className={"w-full p-[10px] h-[40px] border-b-1 focus:outline-none max-md:text-lg"} required={true}/>
                <input type="password" value={password} placeholder={"Password"} onChange={event => setPassword(event.target.value)}
                       className={"w-full p-[10px] h-[40px] border-b-1 focus:outline-none max-md:text-lg"} required={true}/>
                <button type="submit" className={"text-lg h-[40px] w-full bg-gradient-to-r from-purple-400 to-pink-400 mt-[10px] rounded-lg shadow-xl"}>Login</button>
                <div>
                    {!isNewUser ? <div className={"flex gap-[5px] text-lg"}><p>Don't Have Account?</p><p className={"text-blue-900 font-semibold"} onClick={()=> setIsNewUser(true)}>Register</p></div>
                        :<div className={"flex gap-[5px] text-lg"}><p>Have Account?</p><p onClick={()=> setIsNewUser(false)} className={"text-blue-900 font-semibold"}>Login</p></div>}
                </div>
            </form>
        </div>
    )
}
export default LoginPage
