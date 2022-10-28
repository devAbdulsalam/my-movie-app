import React from 'react'
import { SwiperSlide, Swiper, } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation, Scrollbar, A11y} from 'swiper';
SwiperCore.use([Navigation]);
const Cast = ({cast}) => {
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
        (cast.length === 0) ? <p className='text-xl text-center'>No Cast Found</p> :
            cast.map((ct, i) => ( ct.profile_path && 
                <SwiperSlide key={i}>
                <img src={`https://image.tmdb.org/t/p/w300/${ct.profile_path}`} className="border-4 border-teal-400" alt="" />
                <h1 className="text-md font-semibold text-gray-100 mt-1">{ct.name.slice(0, 10)}..</h1>
                <h1 className="text-sm font-semibold text-teal-400 mt-1">{ct.known_for_department}</h1>
                </SwiperSlide>
            )) 
        }
    </Swiper>
  )
}

export default Cast