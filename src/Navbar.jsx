import React, {useState} from 'react'

const Navbar = ({user,profileDir}) => {
    const [signInHovered, setSignInHovered] = useState(false);
    return (
        <nav className={`absolute z-50 h-[60px] w-full flex items-center max-md:h-[50px]`}>
            {/*<img className={"h-full "} src="/public/project-images/menu.svg" alt=""/>*/}
            {
                user?<div   className={"absolute right-[70px] h-[80%] aspect-square rounded-full border-2 border-white"}><img src={profileDir} alt="profile"/></div>
                    :<button onMouseOver={() => setSignInHovered(true)}
                             onMouseLeave={() => setSignInHovered(false)}
                            className={`h-[70%] w-[120px] ${signInHovered?'bg-[rgba(230,0,0,.5)]':'bg-[rgba(230,20,20,.6)]'} cursor-pointer absolute right-[70px] rounded-full`}>
                        <p className={"inline bg-clip-text text-xl text-transparent font-bold bg-gradient-to-b from-blue-100 to-red-200"}>Sign In</p>
                    </button>
            }
        </nav>
    )
}
export default Navbar
