import React from 'react'
import Suggestions from './components/Suggestions.jsx'
import Profilesection from './components/Profilesection.jsx'
import WeatherApp from './weatherapp/App.jsx'
import LatestNews from './LatestNews/LatestNews.jsx'
const Features = () => {
  return (
    <div className='ac:w-[35%] ssm:w-[38%] ssm:flex  md:w-[40%] gap-4 p-2 h-[100vh] overflow-scroll hidden flex-col'>
      <Profilesection/>
      <WeatherApp/>
      <LatestNews/>
      <Suggestions/>
    </div>
  )
}

export default Features