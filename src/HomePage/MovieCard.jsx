import React from 'react';
import {Link} from "react-router-dom";

const MovieCard = ({movieId, setCurrentMovie, poster, rating, title, date, lang, genreIds, genres}) => {
    // Add null check and default to empty array if genres is not available
    const genreNames = genres?.genres ? genres.genres.filter(genre => 
        genreIds?.includes(genre?.id)
    ) : [];

    return (
        <Link to={"/player"}>
            <div onClick={() => {setCurrentMovie(movieId);}} className={"z-0 h-[340px] w-[180px] p-[8px] rounded-lg bg-gradient-to-br from-purple-950 to-[rgba(0,0,255,.13)] max-md:h-[295px] max-md:w-[160px] max-md:min-w-[160px] flex flex-col items-start justify-between"}>
                <img className={"max-h-[260px] rounded-sm max-md:max-h-[300px]"} src={poster?`https://image.tmdb.org/t/p/w500/${poster}`:'/project-images/No-Poster.png' } alt="poster"/>
                <div className={"flex flex-col items-start justify-between"}>
                    <div className={"flex flex-wrap justify-start items-center my-[3px] gap-[2px]"}>
                        <p className={"text-[13px] max-md:text-[11px] font-semibold text-gray-300"}>{title}</p>
                    </div>
                    <div className={"flex flex-wrap justify-start items-center my-[3px] gap-[2px]"}>
                        <p className={"text-[12px]"}>⭐</p>
                        <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{rating}</p>
                        <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>•</p>
                        <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{date}</p>
                        <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>•</p>
                        <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{lang}</p>
                    </div>
                    <div className={"flex flex-wrap justify-start items-center mt-[3px] gap-[2px]"}>
                        {genreNames.length > 0 && genreNames.slice(0, 3).map((genre, index) => (
                            <React.Fragment key={genre.id}>
                                {index > 0 && (
                                    <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>•</p>
                                )}
                                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>
                                    {genre.name}
                                </p>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;