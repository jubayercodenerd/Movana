import React, {useEffect} from 'react';
import {useDebounce} from "react-use";
import Navbar from "../Navbar.jsx";
import MovieCard from "./MovieCard.jsx";
const baseUrl = 'https://api.themoviedb.org/3';
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
const genres = JSON.parse(localStorage.getItem('genres'));
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ApiKey}`
    }
};

const HomePage = ({setIsLoggedIn,isLoggedIn, profileDir}) => {
    const [movies, setMovies] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(1);
    const [endPoint, setEndPoint] = React.useState(`${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setEndPoint(search !== ""
            ? `${baseUrl}/search/movie?query=${search}&include_adult=true&language=en-US&page=${page}`
            : `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`);
        }, [search,page])

    // useEffect(() => {
    //     console.log(genres);
    // })

    useDebounce(() => {
        fetchMovies(endPoint);
    },500,[endPoint]);

    // useEffect(() => {
    //
    //     fetchMovies(endPoint);
    // },[endPoint])

    async function fetchMovies(url) {
        setErrorMessage("");
        setLoading(true);
        try{
            const response = await fetch(url, options);
            const data = await response.json();
            if(!response.ok) {
                throw new Error("error fetching movies");
            }
            if(data.results.length === 0) throw new Error("No movies found.");
            console.log
            setLoading(false);
            setMovies(data.results);
            setNoOfPages(data.total_pages);
            console.log("working");
            console.log(data);
            setErrorMessage("")

        }
        catch (error){
            setMovies([]);
            setNoOfPages(1);
            setErrorMessage(error.message);
            console.log(error.message);
        }

    }
    return (
        <main className={"relative flex flex-col items-center w-full min-h-screen overflow-x-hidden bg-black border-2 px-[10px]"}>
            <img className={"absolute -top-[45%] min-w-[1000px] z-0 lg:-top-[15%] max-xl:-top-[2%]"} src="/project-images/certian.jpg" alt=""/>
            <div className={"flex flex-col justify-start items-center z-10 px-[10px] max-w-[1200px] max-md:max-w-[full]"}>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} profileDir={profileDir} />
                <img className={"max-w-[400px] mt-[30px] max-md:max-w-[350px]"} src="/project-images/hero-img.png " alt=""/>
                <div className={"max-w-[900px]"}>
                    <h1 className={"text-center text-5xl text-white font-bold max-md:text-3xl"}>
                    Enjoy <span className={"bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"}>Movies</span> You Love!<br/>For Free, Forever!
                    </h1>
                </div>
                <img className={"max-h-[80px] my-[25px] max-md:max-h-[40px]"} src="/public/project-images/MovanaLogo.png" alt=""/>
            </div>
            <div className={"z-10 max-w-[700px] w-full h-[40px] max-md:h-[35px] flex justify-start items-center rounded-sm bg-[rgba(230,0,0,.2)] "}>
                <img className={"ml-[10px] h-[50%] filter invert"} src="/public/project-images/search.svg" alt="search-icon"/>
                <input className={"h-full w-full px-[10px] text-lg text-gray-200 focus:outline-none max-md:text-sm"} placeholder={"Search movies"} type="text"
                    onChange={e =>{setSearch(e.target.value); setPage(1);}}
                />
            </div>
            <section className={"z-20 flex justify-center max-md:justify-center items-center flex-wrap gap-[20px] max-w-[1100px] my-[40px] max-md:my-[20px]"}>
                {   movies && movies.length > 0?(
                        movies.map((movie) => {
                            let title = movie.title.length > 22 ? movie.title.slice(0,22) + "..." : movie.title;
                            let rating = movie.vote_average.toFixed(1);
                            let poster = movie.poster_path;
                            let release_date = movie.release_date.slice(0,4);
                            let key = movie.id;
                            let genresIds = movie.genre_ids;
                            return <MovieCard key={key} poster={poster} rating={rating} title={title} date={release_date} lang={movie.original_language} genreIds={genresIds} genres={genres}/>
                        })
                    ):(
                        <div className="w-full text-center">
                            {
                                loading?<p className="text-white text-4xl">{errorMessage ===""?"Loading":errorMessage}</p>
                                    : errorMessage?<p className="text-white text-4xl">{errorMessage ===""?"No Movies found":errorMessage}</p>:<></>
                            }

                        </div>
                    )
                }
            </section>
            <div className={"h-[35px] flex justify-center items-center flex-wrap mb-[30px] gap-[10px]"}>
                {
                    page > 1? <>
                            <button onClick={() =>{setMovies([]); setPage(1); console.log(page);} } className={"relative flex justify-center items-center min-w-[50px] h-full bg-[rgba(230,0,0,.2)] text-lg text-white  rounded-sm cursor-pointer"}>
                                <img className={"h-full filter invert"} src="/public/project-images/angle-left.svg" alt=""/>
                                <img className={"h-full filter invert"} src="/public/project-images/angle-left.svg" alt=""/>
                            </button>
                            <button onClick={() =>{setMovies([]); setPage(prevState => prevState - 1); console.log(page);} } className={"relative flex justify-center items-center min-w-[100px] h-full bg-[rgba(230,0,0,.2)] text-lg text-white  rounded-sm cursor-pointer"}>
                                <p className={"text-center"}>Prev</p>
                            </button>
                        </>
                    : <></>
                }
                <div className={"z-50 flex justify-center items-center min-w-[35px] p[5px] h-full bg-[rgba(230,0,0,.2)] rounded-sm"}><p className={"text-xl text-white"}>{page}</p></div>
                {
                    page === noOfPages? <></>:<>
                        <button onClick={() =>{setMovies([]); setPage(prevState => prevState + 1); console.log(page); scrollTo({top: 400, behavior: "smooth"})}} className={"relative flex justify-center items-center min-w-[100px] h-full bg-[rgba(230,0,0,.2)] text-lg text-white  rounded-sm cursor-pointer"}>
                            <p className={"text-center"}>Next</p>
                        </button>
                        <button onClick={() =>{setMovies([]); setPage(noOfPages); console.log(page);} } className={"relative flex justify-center items-center min-w-[50px] h-full bg-[rgba(230,0,0,.2)] text-lg text-white  rounded-sm cursor-pointer"}>
                            <img className={"h-full filter invert"} src="/public/project-images/angle-right.svg" alt=""/>
                            <img className={"h-full filter invert"} src="/public/project-images/angle-right.svg" alt=""/>
                        </button>
                    </>
                }
            </div>
        </main>
    );
};

export default HomePage;