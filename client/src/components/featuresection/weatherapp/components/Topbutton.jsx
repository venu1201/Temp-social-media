import React from 'react'

function Topbutton({ setQuery }) {
    const cities = [
        {
            id: 1,
            title: 'Hyderabad'
        },

        {
            id: 2,
            title: 'Mumbai'
        },
        {
            id: 3,
            title: 'America'
        },

        {
            id: 4,
            title: 'Delhi'
        },
    ]
    return <div className='flex justify-around items-center '>
        {cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium' onClick={() => setQuery({ q: city.title })}>{city.title}</button>
        ))}


    </div>
}

export default Topbutton