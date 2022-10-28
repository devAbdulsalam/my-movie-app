import React, {useState, useEffect, useCallback} from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Episode from './Episode'
import Seasons from './Seasons';
import SkeletonCard from './SkeletonCard';
let baseUrl = "https://api.themoviedb.org/3"
let APIKey = "&api_key=28be4b4b04afb2ca97b64fb3d9011516"

const Season = () => {
    const [series, setSeries] =useState('')
    const [currentSeason, setCurrentSeason] =useState('')    
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    let { id } = useParams()
    let { type } = useParams()
    let { season } = useParams()

   const fetchData = useCallback(() => {        
        const seasonUrl = `${baseUrl}/${type}/${id}?${APIKey}`       
        const seriesUrl = `${baseUrl}/${type}/${id}/season/${season}?${APIKey}`        
        const getSeries = axios.get(seriesUrl)
        const getSeason = axios.get(seasonUrl)

        axios.all([getSeason, getSeries]).then(axios.spread((...response) =>{
           setCurrentSeason(() => response[0].data)
           setSeries(() => response[1].data)
           setIsLoading(false)
        })).catch((error) => {
           console.log(error)
           setIsLoading(false)
           setIsError(true)
        })
  }, [id, type, season])

    useEffect(()=>{
        fetchData()
    }, [fetchData])
    console.log(series)
    // console.log(currentSeason)

  if(isError){
    return(
        <div className="bg-gray-800 h-80 grid  place-items-center">
            <p className='text-xl text-center text-white'>NetWork Error</p>
        </div>
    )
  }

  return (
    <div className=' pb-2 bg-gray-800 text-white'>
        <div className="flex items-center w-10/12 mx-auto p-2 md:px-1 ">
            <div>
                {isLoading ? <Skeleton /> : <img src={`https://image.tmdb.org/t/p/w300/${series.poster_path}`} alt="" className="border-2 mb-1 min-h-[250px] min-w-[250px] relative hover:border-teal-500" />}
            </div>
            <div className="md:ml-10">
                {series ?
                <>
                    <h1 className="text-3xl py-4 text-gray-100">{series.name}</h1>
                    <h2 className="py-3 text-xl"><span className="text-teal-400">Episodes :</span> {series.episodes.length}</h2>
                    <h2 className="py-3 text-xl"><span className="text-teal-400">DATE : </span>{series.air_date}</h2>
                    <h2 className="py-3 text-xl"><span className="text-teal-400">PREVIOUS SEASON : </span><Link to={`/${type}/${id}/season/${Number(season) - 1}`}>{`Season ${Number(season) - 1}`}</Link></h2>
                    <h2 className="py-3 text-xl"><span className="text-teal-400">NEXT SEASON : </span><Link to={`/${type}/${id}/season/${Number(season) + 1}`}>{`Season ${Number(season) + 1}`}</Link></h2>
                    <p className="text-gray-400 text-sm leading-7 "> {series.overview}</p>
                </> :  
                    <Skeleton count={4}/>
                }
            </div>
        </div>
        <h1 className="text-3xl p-4 ml-2 pb-5 text-gray-100">Episodes</h1>
        <div className="mx-4">
            {isLoading ?  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
            <SkeletonCard cards={8} counts={4} heights={350}  />
            </div> : 
            <Episode episodes={series.episodes} poster={currentSeason.poster_path} type={type} id={id} season={currentSeason} />
            }
        </div>
        <h1 className="text-3xl p-4  ml-4 pb-5 text-gray-100">Seasons</h1>
        <div className='mx-4'>
            {isLoading ?  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
            <SkeletonCard cards={8} counts={4} heights={350}  />
            </div> : 
            <Seasons seasons={currentSeason.seasons} type={type} series={currentSeason} poster={series.poster_path}/> 
            }
        </div>
        <br />
        {/* <h1 className="text-3xl p-4 pb-5 text-gray-100">CAST</h1>
        <div className='mx-4'>
        {isLoading ?  
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
            <SkeletonCard cards={8} counts={4} heights={350}  />
            </div> : 
            < Cast cast={cast} />        
        }
        </div>   
            <br />
            <br />
        <h1 className="text-3xl p-4 pb-5 text-gray-100">Recommended</h1>
        <div className='mx-2'>
        {isLoading ?  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
            <SkeletonCard cards={8} counts={4} heights={350}  />
            </div> : 
            <Recommended recommend={recommend} type={type} /> 
            }
        </div> */}
    </div>
  )
  }
export default Season