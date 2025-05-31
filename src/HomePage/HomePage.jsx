import React, {useEffect} from 'react';
import Navbar from "../Navbar.jsx";
import MovieCard from "./MovieCard.jsx";
const baseUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RkOWI5OWNjMWQwYzMxMWVkYzgxOGVhNDU5MjQ2YyIsIm5iZiI6MTc0ODcxNzgxMS43MDEsInN1YiI6IjY4M2I1MGYzOGZmNjVmYzgzOWYyYWQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gZitpm-MFDTtJ-BCjXS8Bw0wSeo8LlgpVZdZjyT5i9M'
    }
};


const HomePage = () => {
    const [movies, setMovies] = React.useState([]);
    useEffect(() => {
        fetch(baseUrl, options).then(response => response.json()).then(data => {
            setMovies(data.results);
            console.log(data);
        })
        },[])
    return (
        <main className={"relative flex flex-col items-center w-full min-h-screen overflow-x-hidden bg-black border-2 px-[10px]"}>
            <img className={"absolute -top-[45%] min-w-[1000px] z-0 lg:-top-[10%] max-xl:-top-[2%]"} src="/project-images/certian.jpg" alt=""/>
            <div className={"flex flex-col justify-start items-center z-10 px-[10px] max-w-[1200px] max-md:max-w-[full]"}>
                <img className={"max-w-[400px]"} src="/project-images/hero-img.png " alt=""/>
                <div className={"max-w-[900px]"}>
                    <h1 className={"text-center text-5xl text-white font-bold max-md:text-4xl"}>
                    Enjoy <span className={"bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"}>Movies</span> You Love!<br/>For Free, Forever!
                    </h1>
                </div>
                <img className={"max-h-[80px] my-[25px] max-md:max-h-[50px]"} src="/public/project-images/MovanaLogo.png" alt=""/>
            </div>
            <div className={"z-10 max-w-[800px] w-full h-[60px] max-md:h-[45px] flex justify-start items-center rounded-xl bg-[rgba(230,0,0,.2)] "}>
                <img className={"ml-[10px] h-[60%] filter invert"} src="/public/project-images/search.svg" alt="search-icon"/>
                <input className={"h-full w-full px-[10px] text-2xl text-gray-200 focus:outline-none max-md:text-xl"} placeholder={"Search movies"} type="text"/>
            </div>
            <div className={"w-full flex justify-center max-md:justify-center items-center flex-wrap gap-[20px] max-w-[1600px] my-[40px] max-md:my-[20px]"}>
                {
                    movies.map((movie) => {
                        let title = movie.title.length > 22 ? movie.title.slice(0,22) + "..." : movie.title;
                        let rating = movie.vote_average.toFixed(1);
                        let poster = movie.poster_path;
                        let release_date = movie.release_date.slice(0,4);
                        return <MovieCard poster={poster} rating={rating} title={title} date={release_date} lang={movie.original_language}/>
                    })
                }
            </div>
        </main>
    );
};

export default HomePage;