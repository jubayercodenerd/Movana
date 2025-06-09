import React, {useEffect} from 'react'
import Navbar from "../Navbar.jsx";
import {Link} from "react-router-dom";

const url = `https://api.themoviedb.org/3/movie`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RkOWI5OWNjMWQwYzMxMWVkYzgxOGVhNDU5MjQ2YyIsIm5iZiI6MTc0ODcxNzgxMS43MDEsInN1YiI6IjY4M2I1MGYzOGZmNjVmYzgzOWYyYWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gZitpm-MFDTtJ-BCjXS8Bw0wSeo8LlgpVZdZjyT5i9M'
    }
};

const MoviePlayer = ({movie, setIsLoggedIn,isLoggedIn, profileDir}) => {
    const [originalTitle, setOriginalTitle] = React.useState("");
    const [posterPath, setPosterPath] = React.useState('/public/project-images/No-Poster.png');
    const [overview, setOverview] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            const endPoint = `${url}/${movie}?language=en-US`;
            try {
                const response = await fetch(endPoint, options);
                const data = await response.json();
                console.log(data);
                setOriginalTitle(data.title);
                setPosterPath(data.poster_path?`https://image.tmdb.org/t/p/w500/${data.poster_path}`:'/public/project-images/No-Poster.png');
                setOverview(data.overview);
            } catch (err) {
                console.log(err);
            }

        };

        fetchData()
    }, []);

    return (
        <main className={"bg-gray-950 min-h-screen w-screen pt-[60px]"}>
            <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} profileDir={profileDir}/>
            <section className={"w-[80%] mx-auto flex flex-col items-center justify-start"}>
                <div className={"w-full flex justify-start items-center gap-x-[10px] text-white text-lg"}>
                    <Link to="/"><p>Home</p></Link>
                    <p>/</p><p>{originalTitle}</p>
                </div>
                <div className={"w-full aspect-video mt-[10px]"}>
                    <iframe className={"h-full w-full"} src="https://www.youtube.com/embed/Hl9iVr3ZXR8?si=6StpeV23KnGFWeP9"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                </div>
                <div className={"mt-[20px] flex-col items-center justify-center"}>
                    <div><p className={"text-white text-lg"}>If current server doesn't work please try other servers below.</p></div>
                    <div className={"flex justify-center items-center gap-[15px] mt-[10px]"}>
                        <div className={"h-[80px] w-[145px] cursor-pointer bg-gray-800 rounded-lg text-xl text-white flex items-center justify-center"}>server 1</div>
                        <div className={"h-[80px] w-[145px] cursor-pointer bg-gray-800 rounded-lg text-xl text-white flex items-center justify-center"}>server 2</div>
                        <div className={"h-[80px] w-[145px] cursor-pointer bg-gray-800 rounded-lg text-xl text-white flex items-center justify-center"}>server 3</div>
                    </div>
                </div>

                <div className={"w-full flex justify-start items-center gap-[15px] mt-[30px] border-2 border-white"}>
                    <div className={"h-[300px] rounded-xl border-[3px] border-gray-400 overflow-hidden"}>
                        <img className={"h-full"} src={posterPath} alt="poster"/>
                    </div>
                    <div className={"max-w-[1000px] flex flex-col items-center start border-2 border-white"}>
                        <p className={"text-5xl font-semibold text-white"}>{originalTitle}</p>
                        <p className={"text-xl text-white"}>{overview}</p>
                        <div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default MoviePlayer
