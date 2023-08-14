import React from 'react'
import Posts from '../postssection/Posts';
import Features from '../featuresection/Features';
const Dashboard = () => {
  return (
    <div className='w-full  h-full ss:min-h-screen flex'>
       <Posts />
        <Features />
    </div>
  )
}

export default Dashboard