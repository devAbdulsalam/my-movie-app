import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

const useAxios = (url) => {
  const [data, setData] =useState([])
  const [isLoading, setIsLoading] =useState(true)
  const [isError, setIsError] =useState(false)
  const getData = useCallback(() => {
     axios.request(url).then((resonse) =>{
      setData(()=> resonse.data.results)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      setIsError(error.message)
    })
  }, [url])

  useEffect(() =>{
   getData()
  },[url, getData])
  return {data, isLoading, isError}
}

export default useAxios