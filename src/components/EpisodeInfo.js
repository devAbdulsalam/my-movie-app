import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from 'axios'
// //components
import SkeletonCard from './SkeletonCard';
// import Recommended from './Recommended';
import Episode from './Episode';
// import Cast from './Cast'
import Seasons from './Seasons';
// //Url and Key
let baseUrl = "https://api.themoviedb.org/3"
let APIKey = "&api_key=28be4b4b04afb2ca97b64fb3d9011516"

const EpisodeInfo = () => {
  const [movie, setMovie] =useState("")  
  const [video, setVideo] = useState("")
  const [currentEpisode, setCurrentEpisode] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [Season, setSeason] = useState("")

  let { id } = useParams()
  let { type } = useParams()
  let { season } = useParams()
  let { episode } = useParams()

const fetchData = useCallback(() =>{
  const movieUrl =`${baseUrl}/${type}/${id}?${APIKey}`
  const videoUrl = `${baseUrl}/${type}/${id}/videos?${APIKey}`
  const episodeUrl = `${baseUrl}/${type}/${id}/season/${season}/episode/${episode}?${APIKey}`       
  const seasonUrl = `${baseUrl}/${type}/${id}/season/${season}?${APIKey}` 

  const getSeason = axios.get(seasonUrl)
  const getMovie = axios.get(movieUrl)
  const getVideo = axios.get(videoUrl)
  const getEpisode = axios.get(episodeUrl)
  
  axios.all([getMovie, getVideo, getSeason, getEpisode]).then(axios.spread((...response) =>{
      setMovie(() => response[0].data)
      setVideo(() => response[1].data)
      setSeason(() => response[2].data)
      setCurrentEpisode(() => response[3].data)
      setIsLoading(false)
    })).catch((error) => {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    })
  }, [id, type])
  
  useEffect(()=>{
    fetchData()
  }, [fetchData])
  console.log(movie)

  if(isError){
    return(
    <div className="bg-gray-800 h-80 grid place-items-center">
      <p className='text-xl text-center text-white'>NetWork Error</p>
    </div>
    )
  }

  return (
    <div className='bg-gray-800 text-white'>
    <div className="md:flex w-11/12 md:w-10/12 mx-auto p-2 items-center md:px-1 ">
      <div className='relative '>
      {isLoading ? <SkeletonCard cards={1} width={400} heights={400}/> :
        <img src={`https://image.tmdb.org/t/p/w300/${currentEpisode.still_path || movie.poster_path}`} alt="" className="border-4 min-w-[300px] min-h-[300px] mx-auto lg:mb-0 mb-4 border-teal-500" /> 
        }
      </div>
      {isLoading ? <SkeletonCard cards={1} width={400} heights={50} margin={"1.2rem"} counts={8}/> :
      <div className="md:ml-10">                  
          <div>
              <h1 className="text-4xl pb-3 text-gray-100 font-semibold">{currentEpisode.name || movie.original_name}</h1>
                <Link to={`/${type}/${movie.id}/season/${1}`}  >
                  <h2 className="py-2 text-xl"><span className="text-teal-400">SEASON :</span> {currentEpisode.season_number}</h2>
                </Link>
                <h2 className="py-2 text-xl"><span className="text-teal-400">EPISODE :</span> {currentEpisode.episode_number}</h2>
                <h2 className="py-2 text-xl"><span className="text-teal-400">DATE : </span>{currentEpisode.air_date}</h2>
                {currentEpisode.episode_number >= 2 ? <h2 className="py-3 text-xl"><span className="text-teal-400">PREVIOUS EPISODE : </span><Link to={`/${type}/${id}/season/${season}/episode/${Number(episode) - 1}`}>{`Episode ${Number(episode) - 1}`}</Link></h2> : ""}
                {(movie.seasons.length === currentEpisode.episode_number) ? "" : <h2 className="py-3 text-xl"><span className="text-teal-400">NEXT SEASON : </span><Link to={`/${type}/${id}/season/${season}/episode/${Number(episode) + 1}`}>{`Episode ${Number(episode) + 1}`}</Link></h2>}
            </div>
            <h2 className="py-2 text-xl"><span className="text-teal-400"> VOTE : </span>{currentEpisode.vote_average}</h2>
            <a href={`https://youtube.com/watch?v=${video}`} target={"_blank"} rel="noreferrer" className="text-sm bg-gray-700 p-2 px-3 rounded-full leading-8 my-4 hover:bg-gray-600 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                  className="bi bi-play-circle-fill inline pb-1 text-teal-400" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                </svg> Watch Video</a>
            <p className="text-gray-400 text-sm leading-7 mt-3 hidden md:inline-block "><span className="text-teal-400 text-xl">OVERVIEW :</span> {currentEpisode.overview}</p>
          </div>
        }
    </div>
    <div className='mx-4'>
      <span className="text-teal-400 text-xl mt-5 md:hidden block">OVERVIEW :</span>
      <p className="text-gray-400 text-sm leading-7 md:hidden block"> {currentEpisode.overview}</p>
      <br />
      <br />
      <h1 className="text-3xl p-4 ml-2 pb-5 text-gray-100">Episodes</h1>
        <div className='mx-4'>
        {isLoading ?  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
          <SkeletonCard cards={8} counts={4} heights={350}  />
        </div> : 
          <Episode episodes={Season.episodes} poster={movie.poster_path} type={type} id={id} season={season} />
          }
        </div>
      <br/>
      <h1 className="text-3xl p-4 pb-5 text-gray-100">Seasons</h1>
      <div className='mx-4'>
        {isLoading ?  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
          <SkeletonCard cards={8} counts={4} heights={350}  />
        </div> : 
         <Seasons seasons={movie.seasons} type={type} series={movie}/> 
        }
      </div>
    </div>
    </div>
  )
}
export default EpisodeInfo