import React from 'react'
import {Link} from "react-router-dom";

const Movie = ({info, type}) => {
    let movie = info
  return (
    <div className='m-2 relative p-2'>
         <Link to={`/${type}/${movie.id}`}  >
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="" className="border-2 mb-1 w-full relative hover:border-teal-500" />
         </Link>
        <span className="w-11 h-11 absolute  top-3 right-2 rounded-full flex justify-center items-center" style={{ background: `conic-gradient(#14b8a6 ${10 * movie.vote_average}%, rgb(252, 252, 252) ${10 * movie.vote_average}%)` }} >
            <span className="absolute text-gray-100 w-9 h-9 text-center  leading-9 text-sm bg-gray-900 rounded-full font-semibold">
                {movie.vote_average}<span className="text-[9px]">%</span>
            </span>
        </span>
        <h2 className="text-sm font-semibold text-gray-400">{movie.title || movie.name}</h2>
        <h2 className="text-sm font-semibold text-gray-400">{movie.release_date || movie.first_air_date}</h2>
    </div>
    )
}

export default Movie