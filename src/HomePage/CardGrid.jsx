import React from 'react'

const CardGrid = ({children}) => {
    return (
        <div className={"z-50 my-8 w-[95%] md:w-[90%] lg:w-[90%] xl:w-[80%] gap-3 md:gap-5 xl:gap-8 grid " +
            "grid-cols-[repeat(auto-fit,minmax(140px,1fr))] " +
            "sm:grid-cols-[repeat(auto-fit,minmax(160px,.8fr))] " +
            "md:grid-cols-[repeat(auto-fit,minmax(180px,.8fr))] " +
            "lg:grid-cols-[repeat(auto-fit,minmax(200px,.4fr))] " +
            "xl:grid-cols-[repeat(auto-fit,minmax(220px,.2fr))] " +
            "2xl:grid-cols-[repeat(auto-fit,minmax(200px,.1fr))]"}>
            {children}
        </div>
    )
}
export default CardGrid
