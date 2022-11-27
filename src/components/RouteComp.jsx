import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { Results } from './Results';
export const RouteComp = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route exact path='/' element={<Navigate replace to='/search' />} />
        {['search', 'images', 'news', 'videos'].map((path, index) => <Route key={index} path={path} element={<Results />}/>)}
      </Routes>
    </div>
  )
}
