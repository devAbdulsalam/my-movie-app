import React from 'react'
import {Link} from "react-router-dom";
import { SwiperSlide, Swiper, } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation, Scrollbar, A11y} from 'swiper';
SwiperCore.use([Navigation]);

const Episode = ({type, season, episodes, poster, id}) => {
    console.log(episodes[1].episode_number)
    return (
    <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView={5}                
        navigation={true}
        loopFillGroupWithBlank={true}
        pagination={{ clickable: true }}
            breakpoints={{
                "240": {
                "slidesPerView": 2,
                "spaceBetween": 10,
                "slidesPerGroup": 1
                },
                "768": {
                "slidesPerView": 4,
                "spaceBetween": 20,
                "slidesPerGroup": 3

                },
                "1024": {
                "slidesPerView": 5,
                "spaceBetween": 30
                }
            }}
        >
        {(episodes.length === 0) ? <p className='text-xl text-center'>No Episodes</p> : episodes.map((episode, i) => (
        <SwiperSlide key={i}>
            <div className=' hover:border-cyan-500n relative'>
            <Link to={`/${type}/${id}/season/${season}/episode/${Number(episode.episode_number)}`}  >
                <img src={`https://image.tmdb.org/t/p/w300/${episode.poster_path || episode.still_path || poster}`} alt="" className="border mb-1 min-h-[250px] min-w-[200px] relative hover:border-teal-500" />
            </Link>
            <span className="w-11 h-11 absolute  top-3 right-2 rounded-full flex justify-center items-center" style={{ background: `conic-gradient(#14b8a6 ${10 * episode.vote_average}%, rgb(252, 252, 252) ${10 * episode.vote_average}%)` }} >
                <span className="absolute text-gray-100 w-9 h-9 text-center  leading-9 text-sm bg-gray-900 rounded-full font-semibold">
                    {episode.vote_average}<span className="text-[9px]">%</span>
                </span>
            </span>
            <h2 className="text-sm font-semibold text-gray-400">{episode.title || episode.name}</h2>
            <h2 className="text-sm font-semibold text-gray-400">{`Episode ${episode.title || episode.episode_number}`}</h2>
            <h2 className="text-sm font-semibold text-gray-400">{episode.release_date || episode.air_date}</h2>
            </div>
        </SwiperSlide >
        ))}
    </Swiper>
    )
}

export default Episode