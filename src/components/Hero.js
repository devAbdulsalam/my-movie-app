import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import SwiperCore, {
   Pagination, Autoplay
} from 'swiper';

SwiperCore.use([Pagination, Autoplay]);


function Hero ()
{
   return (
      <>
         <Swiper pagination={true}
            autoplay={{
               delay: 3000,
            }}
            parallax={true}
            className="mySwiper">
            <SwiperSlide><img alt="#" src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/12/11/movies_avengers_final_character_banner.jpg"
               className="h-[450px] w-full object-cover " />
               <div className="w-full h-[450px] absolute top-0 bg-gradient-to-b from-gray-900 to-teal-600 opacity-80"></div>
            </SwiperSlide>
            <SwiperSlide><img alt="#" src="https://i2.wp.com/ofallthefilmsites.com/wp-content/uploads/2021/07/black.widow_.poster.social.feature.jpg?fit=1000%2C400"
               className="h-[450px] w-full object-cover " />
               <div className="w-full h-[450px] absolute top-0 bg-gradient-to-b from-gray-900 to-teal-600 opacity-80"></div>
            </SwiperSlide>
            <SwiperSlide><img alt="#" src="https://static2.srcdn.com/wordpress/wp-content/uploads/2018/04/Ezra-Miller-as-The-Flash-With-Flashpoint-Logo.jpg" className="h-[450px] w-full object-cover " />
               <div className="w-full h-[450px] absolute top-0 bg-gradient-to-b from-gray-900 to-teal-600 opacity-80"></div>
            </SwiperSlide>
         </Swiper>
         <div className="absolute top-36 z-10  md:px-0 px-2 w-full text-center left-0">
            <h1 className="md:text-5xl text-3xl text-gray-100 font-semibold">Movies & Tv Shows</h1>
            <button href="#Movies" className="bg-teal-400 font-[Poppins] text-white text-xl px-7 hover:bg-gray-100 duration-300 p-3 rounded-full mt-6 hover:text-teal-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                  className="bi bi-play-circle-fill inline pb-1" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
               </svg> Watch Now</button>
         </div>
      </>
   )
}

export default Hero