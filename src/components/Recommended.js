import React from 'react'
import { SwiperSlide, Swiper, } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation, Scrollbar, A11y} from 'swiper';
import Movie from "./Movie";
SwiperCore.use([Navigation]);

const Recommended = ({recommend, type}) => {
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
    { (recommend.length === 0) ? <p className='text-xl text-center mb-8'>No Recommendation Found</p> :
        recommend.map((movie, i) => (
            <SwiperSlide key={i}>
                <Movie  info={movie} key={i} type={type}/>
            </SwiperSlide>
        ))
        }
    </Swiper>
  )
}

export default Recommended