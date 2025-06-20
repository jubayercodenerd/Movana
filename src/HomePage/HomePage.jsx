import React, { useEffect, useState } from 'react';
import {useDebounce} from "react-use";
import Navbar from "../Navbar.jsx";
import MovieCard from "./MovieCard.jsx";
const baseUrl = 'https://api.themoviedb.org/3';
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ApiKey}`
    }
};
const genresBaseUrl = `${baseUrl}/genre/movie/list?language=en`;

const HomePage = ({setCurrentMovie, search, setSearch}) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(null);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(1);
    const [endPoint, setEndPoint] = React.useState(`${baseUrl}/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`);
    const [loading, setLoading] = React.useState(true);
    const [showFilter, setShowFilter] = React.useState(false);
    const [showAdult, setShowAdult] = React.useState(false);
    const [filterYear, setFilterYear] = React.useState("");
    const [filterSortBy, setFilterSortBy] = React.useState('popularity.desc');

    useEffect(() => {
        setEndPoint(search !== ""
            ? `${baseUrl}/search/movie?query=${search}&include_adult=${showAdult}&year=${filterYear}&language=en-US&page=${page}`
            : `${baseUrl}/discover/movie?include_adult=${showAdult}&language=en-US&page=${page}&sort_by=${filterSortBy}&year=${filterYear}`);
        if (search !== "") setFilterSortBy("");
        }, [search,page,showAdult,filterYear,filterSortBy])

    // useEffect(() => {
    //     console.log(genres);
    // })

    useEffect(() => {
        setPage(1);
    }, [search, showAdult, filterYear, filterSortBy]);

    useDebounce(() => {
        if(endPoint) fetchMovies(endPoint);
    },500,[endPoint]);

    // useEffect(() => {
    //
    //     fetchMovies(endPoint);
    // },[endPoint])

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const includeAdult = form["adult-checkbox"].checked;
        const year = form["year"].value;
        const sortBy = search === ""?(form["sort"].value):null;

        setShowAdult(includeAdult);
        setFilterYear(year);
        setFilterSortBy(sortBy);

        console.log(includeAdult + " " + year + " " + sortBy);
        // updateEndPoint({includeAdult,year,sortBy})
        setShowFilter(false);
    }

    // const updateEndPoint = (params) => {
    //     const newEndPoint = new URL( search === ''?`${baseUrl}/discover/movie?`:`${baseUrl}/search/movie?query=${search}`);
    //     newEndPoint.searchParams.delete("include_adult");
    //     newEndPoint.searchParams.delete("year");
    //     newEndPoint.searchParams.delete("sort_by");
    //     newEndPoint.searchParams.delete("page");
    //
    //     newEndPoint.searchParams.append("include_adult", params.includeAdult);
    //     if(params.year.trim()){
    //         newEndPoint.searchParams.append("year", params.year.replace(/\s+/g, ""));
    //     }
    //     if(params.sortBy.trim() && search === ""){
    //         newEndPoint.searchParams.append("sort_by", params.sortBy);
    //     }
    //     newEndPoint.searchParams.append("page", page);
    //     console.log(newEndPoint);
    //     setEndPoint(newEndPoint);
    // }

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
            setLoading(false);
            setMovies(data.results);
            setNoOfPages(data.total_pages);
            console.log("working");
            console.log(data);
            setErrorMessage("")
        }
        catch (error){
            setLoading(false)
            setMovies([]);
            setNoOfPages(1);
            setErrorMessage(error.message);
            console.log(error.message);
        }

    }

    // Separate useEffect for fetching genres
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(genresBaseUrl, options);
                const data = await response.json();
                setGenres(data);
                localStorage.setItem("genres", JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching genres:", error);
                // Try to get genres from localStorage if fetch fails
                const cachedGenres = localStorage.getItem("genres");
                if (cachedGenres) {
                    setGenres(JSON.parse(cachedGenres));
                }
            }
        };

        // First try to get from localStorage
        const cachedGenres = localStorage.getItem("genres");
        if (cachedGenres) {
            setGenres(JSON.parse(cachedGenres));
        }
        // Fetch fresh data anyway
        fetchGenres();
    }, []);

    // Only show movies when genres are available
    const showMovies = genres && movies.length > 0;

    return (
        <main className={"relative flex flex-col items-center w-full min-h-screen overflow-x-hidden bg-black border-2 px-[10px]"}>
            <img className={"absolute -top-[45%] min-w-[1000px] z-0 lg:-top-[15%] max-xl:-top-[2%]"} src="/project-images/certian.jpg" alt=""/>
            <div className={"flex flex-col justify-start items-center z-10 px-[10px] max-w-[1200px] max-md:max-w-[full]"}>
                <Navbar />
                <img className={"max-w-[400px] mt-[30px] max-md:max-w-[350px]"} src="/project-images/hero-img.png " alt=""/>
                <div className={"max-w-[900px] mb-[30px]"}>
                    <h1 className={"text-center text-5xl text-white font-bold max-md:text-3xl"}>
                    Enjoy <span className={"bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"}>Movies</span> You Love!<br/>For Free, Forever!
                    </h1>
                </div>
                {/*<img className={"max-h-[80px] my-[25px] max-md:max-h-[40px]"} src="/project-images/MovanaLogo.png" alt="Movana logo"/>*/}
            </div>
            <div className={"z-[200] max-w-[800px] w-[90%] border- border-white flex justify-between gap-[20px]"}>
                <div className={"z-10 w-full h-[40px] max-md:h-[35px] flex justify-start items-center rounded-sm bg-gradient-to-br from-purple-950 to-[rgba(0,0,255,.4)] border- border-blue-400"}>
                    <img className={"ml-[10px] h-[50%] filter invert"} src="/project-images/search.svg" alt="search-icon"/>
                    <input className={"h-full w-full px-[10px] text-lg text-gray-200 focus:outline-none max-md:text-sm"} defaultValue={search} placeholder={"Search movies"} type="text"
                        onChange={e =>{setSearch(e.target.value); setPage(1);}}
                    />
                </div>
                <div onClick={() => setShowFilter(!showFilter)} className={"w-[100px] max-md:w-[80px] text-lg max-md:text-sm text-white flex justify-center items-center rounded-sm bg-gradient-to-br to-purple-950 from-[rgba(0,0,255,.4)] relative cursor-pointer"}>Filter
                    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className={`z-[50] flex flex-col justify-start p-[20px] items-start absolute top-[125%] right-0 w-auto h-auto ${showFilter?"":"hidden"} 
                                    rounded-sm bg-gradient-to-br from-purple-950 to-[rgba(0,0,150,1)] text-lg gap-[10px] max-md:text-sm`}>
                        <label
                            htmlFor="adult-checkbox"
                            className="outline-none flex justify-between items-center bg-blue-950 px-[10px] py-[5px] rounded-sm gap-[10px] w-full cursor-pointer"
                        >
                            <span className="text-nowrap">Include adult</span>
                            <input
                                id="adult-checkbox"
                                className="h-[20px] w-[20px] pointer-events-none"
                                type="checkbox"
                            />
                        </label>
                        <div className={"flex flex-col justify-center items-start border- border-yellow-300 gap-[10px] w-full"}>
                            <label htmlFor={"year"}>year</label><input className={"w-full bg-blue-950 px-[10px] py-[5px] rounded-sm focus:outline-none"} id={"year"} type="text" placeholder={"year"}/>
                        </div>
                        {
                            search === ""?<div className={"flex flex-col justify-center items-start  border- border-yellow-300 gap-[10px] w-full"}>
                                <label>sort by </label>
                                <select className={"px-[10px] py-[5px] rounded-sm focus:outline-none bg-blue-950"} name="" id="sort">
                                    <option value="popularity.desc">Popularity desc.</option>
                                    <option value="popularity.asc">Popularity asc.</option>
                                    <option value="title.desc">Title desc.</option>
                                    <option value="title.asc">Title asc.</option>
                                    <option value="vote_average.desc">Rating desc.</option>
                                    <option value="vote_average.asc">Rating asc.</option>
                                    <option value="primary_release_date.desc">Release date desc.</option>
                                    <option value="primary_release_date.asc">Release date asc.</option>
                                </select>
                            </div>:<></>
                        }
                        <button type={"submit"} className={"flex flex-col justify-center items-center mt-[15px] py-[5px] rounded-sm bg-gradient-to-br to-purple-900 from-blue-900 border- border-yellow-300 w-full cursor-pointer"}>Filter</button>
                    </form>
                </div>
            </div>
            <section className={"z-20 flex justify-center max-md:justify-center items-center flex-wrap gap-[20px] max-md:gap-[10px] max-w-[1100px] my-[40px] max-md:my-[20px]"}>
                {showMovies ? (
                    movies.map((movie) => {
                        let title = movie.title.length > 22 ? movie.title.slice(0,22) + "..." : movie.title;
                        return (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                setCurrentMovie={setCurrentMovie}
                                poster={movie.poster_path}
                                rating={movie.vote_average?.toFixed(1) || "N/A"}
                                title={title}
                                date={movie.release_date?.slice(0,4) || "N/A"}
                                lang={movie.original_language}
                                genreIds={movie.genre_ids}
                                genres={genres}
                            />
                        );
                    })
                ) : (
                    <div className="w-full text-center">
                        <p className="text-white text-4xl">
                            {loading ? "Loading" : errorMessage || "No Movies found"}
                        </p>
                    </div>
                )}
            </section>
            <div className={"h-[35px] flex justify-center items-center flex-wrap mb-[30px] gap-[10px]"}>
                {
                    page > 1? <>
                            <button onClick={() =>{setMovies([]); setPage(1); console.log(page);} } className={"relative flex justify-center items-center min-w-[50px] h-full bg-gradient-to-br from-purple-950 to-[rgba(0,0,255,.4)] text-lg text-white  rounded-sm cursor-pointer"}>
                                <img className={"h-full filter invert"} src="/project-images/angle-left.svg" alt=""/>
                                <img className={"h-full filter invert"} src="/project-images/angle-left.svg" alt=""/>
                            </button>
                            <button onClick={() =>{setMovies([]); setPage(prevState => prevState - 1); console.log(page);} } className={"relative flex justify-center items-center min-w-[60px] h-full bg-gradient-to-br from-purple-950 to-[rgba(0,0,255,.4)] text-lg text-white  rounded-sm cursor-pointer"}>
                                <p className={"text-center"}>Prev</p>
                            </button>
                        </>
                    : <></>
                }
                <div className={"z-50 flex justify-center items-center min-w-[35px] p[5px] h-full bg-gradient-to-br from-purple-950 via-[rgb(0,0,255,.4)] to-purple-950  rounded-sm"}><p className={"text-xl text-white"}>{page}</p></div>
                {
                    page === noOfPages? <></>:<>
                        <button onClick={() =>{setMovies([]); setPage(prevState => prevState + 1); console.log(page); scrollTo({top: 400, behavior: "smooth"})}} className={"relative flex justify-center items-center min-w-[60px] h-full bg-gradient-to-br to-purple-950 from-[rgba(0,0,255,.4)] text-lg text-white  rounded-sm cursor-pointer"}>
                            <p className={"text-center"}>Next</p>
                        </button>
                    </>
                }
                {
                    search === "" || page === noOfPages? <></>
                        :<>
                            <button onClick={() =>{setMovies([]); setPage(noOfPages); console.log(page);} } className={"relative flex justify-center items-center min-w-[50px] h-full bg-gradient-to-br to-purple-950 from-[rgba(0,0,255,.4)] text-lg text-white  rounded-sm cursor-pointer"}>
                                <img className={"h-full filter invert"} src="/project-images/angle-right.svg" alt=""/>
                                <img className={"h-full filter invert"} src="/project-images/angle-right.svg" alt=""/>
                            </button>
                    </>
                }
            </div>
        </main>
    );
};

export default HomePage;