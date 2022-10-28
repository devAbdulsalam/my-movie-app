import Hero from "./Hero"
import React, {useState, useEffect} from 'react'
import useAxios from './useAxios'
import {Link} from 'react-router-dom'
import Movie from "./Movie"
import {categories} from "./Data"
import Series from "./Series"
import SkeletonCard from './SkeletonCard'
let baseUrl = "https://api.themoviedb.org/3"
let APIKey = "&api_key=28be4b4b04afb2ca97b64fb3d9011516"
const Home = () => {
  const [moviearr, setMoviearr] =useState([])
  const [type, setType] =useState("movie")
  const [useUrl, setUseUrl] = useState(baseUrl+"/discover//movie?sort_by=popularity.desc"+APIKey)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('')
  let {data, isLoading, isError} = useAxios(useUrl)
    useEffect(()=>{
        setMoviearr(data)
    }, [data])

    const ChangeType = (typ) =>{
      setType(typ)
      if(typ === "movie"){
        setUseUrl(baseUrl+"/discover/movie?sort_by=popularity.desc"+APIKey)
      }
      if(typ === "tv"){
        setUseUrl(baseUrl+"/discover/tv?sort_by=popularity.desc"+APIKey)
      }

      }

    const changeUrl= (movieType) =>{
      if(movieType === "Popular"){
        setUseUrl(baseUrl+"/discover/"+type+"?sort_by=popularity.desc"+APIKey)
        setActive(movieType)
      }
      if(movieType === "Drama"){
        setUseUrl(baseUrl+"/discover/"+type+"?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10"+APIKey)
        setActive(movieType)
      }
      if(movieType === "Theatre"){
        setUseUrl(baseUrl+"/discover/"+type+"?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+APIKey)
        setActive(movieType)
      }
      if(movieType === "Kids"){
          setUseUrl(baseUrl+"/discover/"+type+"?certification_country=US&certification.lte=G&sort_by=popularity.desc"+APIKey)
          setActive(movieType)
      }
      if(movieType === "Comedy"){
          setUseUrl(baseUrl+"/discover/"+type+"?with_genres=35&with_cast=23659&sort_by=revenue.desc"+APIKey)
          setActive(movieType)
      }
      
    }
  const searchMovies = (evt) =>{
    if(query !== "" && evt.key === "Enter"){
      setUseUrl("https://api.themoviedb.org/3/search/movie?"+APIKey+"&query="+query)
    }

  }

  if(isError){
    return(
    <div className="bg-gray-800 h-80 grid  place-items-center">
      <p className='text-xl text-center text-white'>NetWork Error</p>
    </div>
    )
  }

  return (
    <div className='relative bg-gray-800'>
      <Hero />
      <div className="bg-gray-900 p-[0.5px] mb-5 sticky z-50 w-full top-0 left-0" >
        <div className=' flex justify-center md:justify-around items-center flex-col md:flex-row flex-wrap gap-2 p-4 md:w-11/12 mx-auto '>
            <div className='flex'>
              <a href="#movies" className={`p-2 px-4 text-xl font-semibold rounded-sm hover:bg-teal-300 text-bold cursor-pointer ${type === "movie" ? 'bg-teal-500 text-white': "text-white"}`} onClick={() => ChangeType('movie')}>MOVIE</a>
              <Link to="/series" className={`p-2 px-4 text-xl font-semibold rounded-sm hover:bg-teal-300 text-bold cursor-pointer ${type === "tv" ? 'bg-teal-500 text-white' : "text-white"}`} onClick={() => ChangeType('tv')}>TV Series</Link>
              {/* <button className={`p-2 px-4 text-xl font-semibold rounded-sm hover:bg-teal-300 text-bold cursor-pointer ${type === "movie" ? 'bg-teal-500 text-white': "text-white"}`} onClick={() => ChangeType('movie')}>MOVIE</button>
              <button className={`p-2 px-4 text-xl font-semibold rounded-sm hover:bg-teal-300 text-bold cursor-pointer ${type === "tv" ? 'bg-teal-500 text-white' : "text-white"}`} onClick={() => ChangeType('tv')}>TV Series</button> */}
            </div>
            <div className="text-center">
              {categories.map((cat, i) => {
                return(
                <button className={`p-2 px-4 mx-2 text-xl rounded-sm font-semibold hover:bg-teal-500  text-bold cursor-pointer ${active === cat ? 'text-teal-400' : "text-white" }`} onClick={(e) => {changeUrl(e.target.name)}} key={i} name={cat} href="#">{cat}</button>
              )})}
            </div>
            <div>
              <input type="text" className="rounded-sm p-2 bg-gray-400 focus:outline-none" value={query} onInput={(e) => setQuery(e.target.value)}  onKeyUp={searchMovies}/>
              <button className="p-2 px-5 font-semibold rounded-sm text-white bg-teal-400 hover:bg-teal-500" onClick={searchMovies}>Search</button>
            </div>
        </div>
      </div>
      <div id="movies" className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:w-11/12 mx-auto">
        {isLoading ? <SkeletonCard cards={8} counts={2} heights={350} /> : moviearr.map((movie, i) => <Movie  info={movie} type={type} key={i}/>)}
      </div>
      <Series />
    </div>
  )
}

export default Home