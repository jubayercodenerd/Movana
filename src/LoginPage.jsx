import React from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import {useEvent} from "react-use";
const baseUrl = "http://localhost:3000/Users"

const LoginPage = ({setIsLoggedIn,setProfielDir}) => {
    const [isNewUser, setIsNewUser] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [wrongCreds,setWrongCreds] = React.useState(false);
    const [emailExists, setEmailExists] = React.useState(false);
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        if (!isNewUser) {
            const response = await fetch(`${baseUrl}?email=${email}&password=${password}`);
            const data = await response.json();
            if (data.length === 1 && data[0].email === email && data[0].password === password) {
                setProfielDir(data[0].profilePicture);
                setIsLoggedIn(true);
                setWrongCreds(false);
                setEmailExists(false);
                localStorage.setItem("user", JSON.stringify(data[0]));
                navigate("/");
            } else {
                setWrongCreds(true);
                setEmailExists(false);
                setEmail("");
                setPassword("");
            }
        }
        else {
            const response = await fetch(`${baseUrl}?email=${email}`);
            const data = await response.json();
            if (data.length > 0) {
                setEmailExists(true);
                setWrongCreds(false);
                setEmail("");
                setPassword("");
                return;
            }
            const post = await fetch(`${baseUrl}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "profilePicture": "/profile-pictures/default.jpg",
                    "email": email,
                    "password": password,
                    "history": []
                }),
            });
            if (post.status === 201) {
                const res = await post.json();
                setIsLoggedIn(true);
                setWrongCreds(false);
                setEmailExists(false);
                localStorage.setItem("user", JSON.stringify(res));
                navigate("/");
            }
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
                <button type="submit" className={"text-lg h-[40px] w-full bg-gradient-to-r from-purple-400 to-pink-400 mt-[10px] rounded-lg shadow-xl"}>{isNewUser?"Register":"Log In"}</button>
                <div>
                    {!isNewUser ? <div className={"flex gap-[5px] text-lg"}><p>Don't Have Account?</p><p className={"text-blue-900 font-semibold"} onClick={()=> setIsNewUser(true)}>Register</p></div>
                        :<div className={"flex gap-[5px] text-lg"}><p>Have Account?</p><p onClick={()=> setIsNewUser(false)} className={"text-blue-900 font-semibold"}>Login</p></div>}
                </div>
                {
                    wrongCreds ? <><p className={"text-lg text-red-700"}>Email or password doesnt match!</p></>:<></>
                }
                {
                    emailExists? <><p className={"text-lg text-red-700"}>Email already registered!</p></>:<></>
                }
            </form>
        </div>
    )
}
export default LoginPage;
