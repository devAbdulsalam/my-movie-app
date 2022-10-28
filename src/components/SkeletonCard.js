import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SkeletonCard = ({cards, counts, heights, width, margin}) => {
    return (
      Array(cards).fill("card").map((item, index) => (
        <div key={index}className='w-full mx-2'>
            <Skeleton baseColor="#2d3748" highlightColor="#718096" width={width} height={heights}/>
            <Skeleton baseColor="#2d3748" highlightColor="#718096" width={width} style={{marginBottom : margin}} count={counts}/>
        </div>
      ))
  )
}

export default SkeletonCard