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
    const [serverChoice, setServerChoice] = React.useState(1);
    const [genres, setGenres] = React.useState([]);
    const [runtime, setRuntime] = React.useState([]);
    const [rating, setRating] = React.useState("N/A");
    const [language, setLanguage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            const endPoint = `${url}/${movie}?language=en-US`;
            setErrorMessage("Loading...")
            try {
                const response = await fetch(endPoint, options);
                const data = await response.json();
                setErrorMessage("");
                console.log(data);
                setOriginalTitle(data.title);
                setPosterPath(data.poster_path?`https://image.tmdb.org/t/p/w500/${data.poster_path}`:'/public/project-images/No-Poster.png');
                setOverview(data.overview);
                setGenres(data.genres);
                setRuntime(data.runtime);
                setRating(data.vote_average.toFixed(1));
                setLanguage(data.spoken_languages[0].english_name);
                console.log(language);
            } catch (err) {
                console.log(err);
                setErrorMessage(err.message);
            }

        };

        fetchData()
    }, []);

    return (
        <main className={"bg-gray-950 min-h-screen w-screen pt-[60px]"}>
            <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} profileDir={profileDir}/>
            <section className={"w-[80%] mx-auto flex flex-col items-center justify-start"}>
                <div className={"w-full flex justify-start items-center gap-x-[10px] text-white text-lg max-md:text-sm"}>
                    <Link to="/"><p>Home</p></Link>
                    <p>/</p><p>{errorMessage ===""? originalTitle : errorMessage}</p>
                </div>
                <div className={"w-full aspect-video mt-[10px]"}>
                    <iframe className={"h-full w-full text-green-700"} src="https://www.youtube.com/embed/Hl9iVr3ZXR8?si=6StpeV23KnGFWeP9"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                </div>
                <div className={"mt-[20px] flex-col items-center justify-center"}>
                    <div><p className={"text-white text-lg max-md:text-sm"}>If current server doesn't work please try other servers below.</p></div>
                    <div className={"flex justify-center items-center gap-[15px] mt-[10px]"}>
                        <div onClick={() => setServerChoice(1)}
                             className={`transition-all duration-200 ease-in-out h-[80px] grow cursor-pointer  ${(serverChoice === 1) ? "bg-blue-500 text-black":"bg-gray-800 text-white"} 
                             rounded-lg text-xl flex items-center justify-center max-md:text-sm max-md:h-[60px]`}>server 1
                        </div>
                        <div onClick={() => setServerChoice(2)}
                             className={`transition-all duration-200 ease-in-out h-[80px] grow cursor-pointer  ${(serverChoice === 2) ? "bg-blue-500 text-black":"bg-gray-800 text-white"} 
                             rounded-lg text-xl flex items-center justify-center max-md:text-sm max-md:h-[60px]`}>server 2
                        </div>
                        <div onClick={() => setServerChoice(3)}
                             className={`transition-all duration-200 ease-in-out h-[80px] grow cursor-pointer  ${(serverChoice === 3) ? "bg-blue-500 text-black":"bg-gray-800 text-white"} 
                             rounded-lg text-xl flex items-center justify-center max-md:text-sm max-md:h-[60px]`}>server 3
                        </div>
                    </div>
                </div>

                {
                    errorMessage ===""?
                    <>
                        <div className="w-full flex flex-wrap items-start gap-[25px] my-[30px]">
                            <div className={"h-[300px] rounded-xl border-[3px] border-gray-400 overflow-hidden flex-shrink-0"}>
                                <img className={"h-full"} src={posterPath} alt="poster"/>
                            </div>
                            <div className={"flex-[1_1_0%] min-w-[250px] flex-grow flex flex-col justify-center items-start gap-[20px] border- border-red-500"}>
                                <div className={"flex flex-col justify-center items-start gap-[20px] border- border-red-500"}>
                                    <p className={"text-5xl font-semibold text-white border- border-blue-400 max-md:text-3xl"}>{originalTitle}</p>
                                    <p className={"text-lg text-white border- border-blue-400 max-md:text-sm"}>{overview}</p>
                                </div>
                                <div className="flex items-start gap-[30px] w-full">
                                    {/* Label List */}
                                    <ul className="text-white text-lg flex flex-col justify-between gap-[10px] max-md:text-sm list-none flex-shrink-0">
                                        <li>Genre:</li>
                                        <li>Runtime:</li>
                                        <li>Rating:</li>
                                        <li>Language:</li>
                                    </ul>

                                    {/* Value List */}
                                    <ul className="text-white text-lg flex flex-col gap-[10px] max-md:text-sm list-none flex-grow min-w-0 break-words">
                                        <li>{genres[0]?.name || "N/A"}, {genres[1]?.name || "N/A"}, {genres[2]?.name || "N/A"}.</li>
                                        <li>{runtime} minutes.</li>
                                        <li>⭐ {rating}</li>
                                        <li>{language}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <footer className={"w-screen shrink min-w-[300px] text-white p-[40px] mt-[30px] max-md:p-[20px] bg-gray-900 border- border-blue-300"}>
                            <div className={"w-full shrink min-w-[300px] text-white border- border-yellow-300"}>
                                <h1 className={"mb-[15px] text-2xl max-md:text-xl"}>About Us</h1>
                                <p className={"text-lg max-md:text-sm"}>is a free TV shows streaming website with zero ads. It allows you to <b>watch movies online</b> in high quality for free.</p>
                            </div>
                        </footer>
                    </>:
                        <><p className={"text-3xl text-white"}>{errorMessage}</p></>
                }

            </section>
        </main>
    )
}
export default MoviePlayer
