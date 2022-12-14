import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Loading } from './Loading';
import { useResultContext } from '../contexts/ResultContextProvider';

export const Results = () => {
  const {getResults, searchResults, isLoading, searchTerm } = useResultContext();
  const location = useLocation();
  
  useEffect(() => {

    if(searchTerm){
      if(location.pathname === '/videos'){
        getResults(`/search?query=${searchTerm} videos`)
      }else if(location.pathname === "/images") {
        getResults(`${location.pathname}earch?query=${searchTerm}&num=20`)     
      }
      
      else {
        getResults(`${location.pathname}?query=${searchTerm}&num=20`)     
      }
    }
    
  }, [location.pathname])
  

  if(isLoading) return (<Loading />)
  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {searchResults.map(({link, title}, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel='noreferrer'>
                <p className='text-sm'>
                  {link.length > 30 ? link.substring(0, 30): link}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>

              </a>
            </div>
          ))}

        </div>
      )
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {searchResults.map(({title, thumbnailImageUrl, originalImageUrl, contextLink}, index) => (
            <a className='sm:p-3 p-5' href={contextLink} key={index}>
              <img src={thumbnailImageUrl} alt={title} loading="lazy"/>
              <p className='w-36 break-words text-sm mt-2'>
                {title}
              </p>
            </a>

          ))}
        </div>

      )
    case '/news':
      return (
        <div className='flex flex-wrap justify-between items-center space-y-6 sm:px-56'>
          {searchResults.map(({links, id, source,title}, index) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={links?.[0].href} target="_blank" rel='noreferrer' className='hover:underline'>
                <p className='text-sm'>
                  {title}
                </p>
              </a>
              <div className='flex gap-4'>
                <a href={source.href} target="_blank" rel='noreferrer'>
                      {source.href}
                </a>
              </div>
            </div>
          ))}

        </div>
      )
    case '/videos':
          return (
            <div className='flex flex-wrap'>
              {
                searchResults.map(({additional_links}, index) => (
                  <div key={index} className='p-2'>
                      {additional_links?.[0]?.href && <ReactPlayer url={additional_links?.[0].href}  width="355px" height="200px" />}
                  </div>
                ))
              }
            </div>
          )
    default:
      return 'ERROR'
  }
}
