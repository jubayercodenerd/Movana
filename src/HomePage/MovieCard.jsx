
const MovieCard = ({key,poster,rating,title,date,lang,}) => {
    return (
        <div className={"h-[325px] w-[180px] p-[8px] rounded-lg bg-[rgba(230,0,0,.2)] max-md:h-[320px] max-md:w-[180px] max-md:min-w-[180px]"}>
            <img className={"max-h-[260px] rounded-sm max-md:max-h-[300px]"} src={poster?`https://image.tmdb.org/t/p/w500/${poster}`:'/public/project-images/No-Poster.png' } alt="poster"/>
            <div className={"flex flex-wrap justify-start items-center my-[3px] gap-[2px]"}>
                <p className={"text-[13px] max-md:text-[11px] font-semibold text-gray-300"}>{title}</p>
            </div>
            <div className={"flex flex-wrap justify-start items-center my-[3px] gap-[2px]"}>
                <img className={"h-[12px]"} src="/public/project-images/star.png" alt="ratin-star"/>
                <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{rating}</p>
                <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>•</p>
                <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{date}</p>
                <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>•</p>
                <p className={"text-[12px] max-md:text-[11px] font-semibold text-gray-300"}>{lang}</p>
            </div>
            <div className={"flex flex-wrap justify-start items-center mt-[3px] gap-[2px]"}>
                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>Supernatural</p>
                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>•</p>
                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>horror</p>
                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>•</p>
                <p className={"text-[10px] max-md:text-[10px] font-semibold text-gray-300"}>Thriller</p>
            </div>
        </div>
    )
}
export default MovieCard
