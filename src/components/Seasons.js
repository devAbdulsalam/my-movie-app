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

const Seasons = ({seasons, type, series, poster}) => {
    // console.log(seasons)
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
              {
                (seasons.length === 0) ? <p className='text-xl text-center'>No Season Found</p> :
                seasons.map((ct, i) => (
                    <SwiperSlide key={i}>
                      <Link to={`/${type}/${series.id}/season/${Number(ct.season_number) + 1}`}  >
                        <img src={`https://image.tmdb.org/t/p/w300/${ct.poster_path || series.poster_path || poster}`} className="border-2 border-teal-400" alt="" />
                      </Link>
                      <h1 className="text-sm font-semibold text-teal-400 mt-1">{`Season : ${ct.name}`}</h1>
                      <h1 className="text-sm font-semibold text-teal-400 mt-1">{`Episodes : ${ct.episode_count}`}</h1>
                      <h1 className="text-md font-semibold text-gray-100 mt-1">{ct.air_date}</h1>
                    </SwiperSlide>
                )) 
              }
          </Swiper>
  )
}

export default Seasons