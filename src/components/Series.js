import React, {useState, useEffect} from 'react'
import SkeletonCard from './SkeletonCard'
import Movie from './Movie'
import useAxios from './useAxios'
let url = "https://api.themoviedb.org/3/tv/popular?api_key=28be4b4b04afb2ca97b64fb3d9011516"
const Series = () => {
    let {data, isLoading} = useAxios(url)
    let type = "tv"
    const [series, setSeries] =useState([])
    useEffect(()=>{
        setSeries(() => data)
    }, [data])
  return (
    <div id="series" className='pb-2 bg-gray-800'>
        <h1 className="text-3xl p-4 pb-5 text-gray-100">Watch Tv Series</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-11/12 mx-auto">
        {isLoading ? <SkeletonCard cards={8} counts={2} heights={350} /> :  
        series.map((series, i) => (
            <Movie  info={series} key={i} type={type}/>
            ))
        }
        </div>
    </div>
  )
  }
  export default Series