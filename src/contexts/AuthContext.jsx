import react,{createContext,useEffect,useState} from "react";
const baseUrl = "http://localhost:3000/Users"

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) setUser(JSON.parse(user));
    },[])

    const login = async (email,password) => {
        try {
          const response = await fetch(`${baseUrl}?email=${email}&password=${password}`)
            if(response.status !== 200) throw new Error("Something went wrong!");
            const data = await response.json();
            if(data.length > 0 && data[0].email === email && data[0].password === password) {
                await setUser(data[0]);
                console.log(user)
                setError(null);
                localStorage.setItem("user", JSON.stringify(data[0]));
                return true;
            }
            else throw new Error("Invalid credentials!");
        }
        catch (error) {
            setError(error.message);
            console.log(error.message);
            return false;
        }
    }

    const register = async (firstName,lastName,email,password) => {
        try {
            const response = await fetch(`${baseUrl}?email=${email}`);
            if(response.status !== 200) throw new Error("Something went wrong!");
            const data = await response.json();
            if(data.length > 0) throw new Error("Email already exists!");
            const response2 = await fetch(`${baseUrl}`, {
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
            })

            const newUser = await response2.json();
            setUser(newUser);
            setError(null);
            localStorage.setItem("user", JSON.stringify(newUser));
            return true;
        }
        catch (error) {
            setError(error.message);
            console.log(error.message);
            return false;
        }
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user,login,register,logOut,error,setError}}>
            {children}
        </AuthContext.Provider>
    )
}