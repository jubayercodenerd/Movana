import React from 'react';

const HomePage = () => {
    return (
        <main className={"relative flex flex-col items-center w-full min-h-screen overflow-x-hidden bg-black border-2"}>
            <img className={"absolute -top-[15%] min-w-[1000px] object-center max-md:top-0"} src="/project-images/certian.jpg" alt=""/>
            <div className={"flex flex-col justify-start items-center z-10 max-w-[1200px] border-2 border-white max-md:max-w-[full]"}>
                <img className={"max-w-[400px]"} src="/project-images/hero-img.png " alt=""/>
                <div className={"max-w-[700px]"}>
                    <h1 className={"text-center text-6xl text-white font-bold max-md:text-4xl"}>
                    Enjoy <span className={"bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent"}>Movies</span> You Love!<br/>For Free, Forever!
                    </h1>
                </div>
                <div className={"w-full flex flex-wrap "}></div>

            </div>
        </main>
    );
};

export default HomePage;