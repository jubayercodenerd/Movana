import React from 'react'

const Navbar = () => {
    return (
        <nav className={`h-[75px] w-full bg-blue-950 flex items-center justify-between z-20 max-md:h-[50px] p-[10px]`}>
            <img className={"h-[70%] "} src="/public/project-images/menu.svg" alt=""/>
            <div className={"h-full max-w-[800px] w-full mx-[20px] flex items-center justify-start border-2 border-white rounded-xl" +
                ""}>
                <img className={"h-[70%] mx-[10px] "} src="/public/project-images/search.svg" alt="search-icon"/>
                <input className={"border-none bg-transparent h-full w-full focus:outline-none text-2xl text-white"} type="text" placeholder="Search Movies"/>
            </div>
            <img className={"h-[70%]"} src="/public/project-images/user.svg" alt="User-icon"/>
        </nav>
    )
}
export default Navbar
