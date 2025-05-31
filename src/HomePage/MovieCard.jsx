
const MovieCard = ({poster,rating,title,date,lang,}) => {
    return (
        <div className={"h-[540px] w-[300px] p-[15px] rounded-xl bg-[rgba(230,0,0,.2)]"}>
            <img className={"max-h-[400px] rounded-lg"} src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="poster"/>
            <div className={"flex flex-wrap justify-start items-center my-[10px] gap-[5px]"}>
                <img className={"h-[80%]"} src="/public/project-images/star.png" alt="ratin-star"/>
                <p className={"text-lg font-semibold text-gray-300"}>{rating}</p>
                <p className={"text-lg font-semibold text-gray-300"}>•</p>
                <p className={"text-lg font-semibold text-gray-300"}>{title}</p>
            </div>
            <div className={"flex flex-wrap justify-start items-center my-[10px] gap-[5px]"}>
                <p className={"text-lg font-semibold text-gray-300"}>{date}</p>
                <p className={"text-lg font-semibold text-gray-300"}>•</p>
                <p className={"text-lg font-semibold text-gray-300"}>{lang}</p>
            </div>
            <div className={"flex flex-wrap justify-start items-center mt-[10px] gap-[5px]"}>
                <p className={"text-sm font-semibold text-gray-300"}>Supernatural</p>
                <p className={"text-sm font-semibold text-gray-300"}>•</p>
                <p className={"text-sm font-semibold text-gray-300"}>horror</p>
                <p className={"text-sm font-semibold text-gray-300"}>•</p>
                <p className={"text-sm font-semibold text-gray-300"}>Thriller</p>
            </div>
        </div>
    )
}
export default MovieCard
