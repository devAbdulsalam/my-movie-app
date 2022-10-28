import { PRODUCTS, SOCIAL_MEDIA, COMPANY, SUPPORT } from '../Data'
import Items from './Items';

const Footer = () =>
{
  return (
    <footer className='bg-gray-900 text-white px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:place-items-center gap-6 sm:px-8 px-5 py-8'>
        <Items links={PRODUCTS} tit="PRODUCTS" />
        <Items links={SOCIAL_MEDIA} tit="RESOURCES" />
        <Items links={COMPANY} tit="COMPANY" />
        <Items links={SUPPORT} tit="SUPPORT" />
      </div>
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'></div> */}
      <div className='text-center pt-2 text-gray-400 text-sm pb-8'>
        <span>© 2020 <a href='devAbdulsalam.netlify.app'>DevAbdulsalam</a>. All rights reserved.</span>
        <span className='md:block'> Terms· Privacy Policy</span>
      </div>
    </footer>
  )
}

export default Footer
