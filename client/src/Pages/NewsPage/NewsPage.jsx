import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchtopheadlines, fetchtopheadlinesbycategory } from '../../actions/News';
import Newsbox from './Components/Newsbox';
import LoadingSpinner from '../../components/Spinner/Spinner'
const NewsPage = () => {
    const category=['general','science','sports','technology','entertainment','business','health'];
    const [active,setactive]=useState(0);
    const [data,setdata]=useState(null);
    const [cat,setcat]=useState(null);
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchtopheadlinesbycategory(cat,setdata));
    }, [cat])
    const handleclick=(index,cat)=>{
        if(active!=index)
        {
            setactive(index);
            setcat(cat);
            setdata(null);
        }

       
    }
    console.log(active)
  return (
    <div className=' md:w-[75%] flex flex-col sm:w-[68%] ss:w-[90%] w-full ssm:w-[74%] ac:w-[78%] font-poppins text-white h-full'>
        <div className='flex justify-center w-full h-[20%] items-center text-[30px]'>
            Welcome To Latest News
        </div>
        <div className='flex w-full justify-center flex-wrap gap-10'>
            {category.map((item,index)=>(
                <div key={item} onClick={()=>handleclick(index,item)} className={`w-[140px] cursor-pointer h-[40px] flex justify-center items-center rounded-xl ${active==index? "bg-cyan-500":"bg-orange-500"}`}>
                    {item}
                </div>
            ))}
        </div>
        {
            data ? (
                <div className='h-[65%] pb-10 pt-3 overflow-scroll mt-[5%] gap-5 flex flex-wrap justify-center'>
                {data?.map((item,index)=>(
                    <div className=' '>
                        <Newsbox data={item}/>
                        
                    </div>
                    
                ))}
                </div>
            ):(
                <div className='flex justify-center items-center h-full w-full'>
                    <LoadingSpinner/>
                </div>
            )
        }
       
    </div>
  )
}

export default NewsPage