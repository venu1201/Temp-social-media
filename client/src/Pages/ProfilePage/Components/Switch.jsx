import React,{useState,useRef, useEffect} from 'react'

const Switch = ({data,setshowposts}) => {
  const [active, setactive] = useState(0);
  const [position, setposition] = useState(0);
  const [windowWidth, setwindowWidth] = useState(useRef(window.innerWidth));
  //const windowWidth = useRef(window.innerWidth);
  //const windowHeight = useRef(window.innerHeight);
 
  const curr=()=>{
    setwindowWidth(window.innerWidth);
    return windowWidth;
  }
  const func=(size)=>{
    console.log("console ",size);
    size=curr();
    if(size.current<330)
    {
      return 65;
    }
    else if(size.current<850)
    {
      return 80;
    }
    return 100;
  }
  const activeTab = (tab, index) => {
    setposition(index * func(windowWidth));
    setTimeout(() => {
        setactive(index);
    }, 350);
    setshowposts((prev)=>!prev);
};
  console.log(position+"pxx")
  return (
    <div className='ss:w-[203px] xs:w-[163px] w-[133px]  rounded-2xl flex justify-center items-center bg-white h-[43px]'>
      <div className='relative ss:w-[200px] xs:w-[160px] w-[130px] h-full flex justify-evenly items-center'>
        {data.map((tab,index)=>(
          
          <div key={index} className={ `flex h-full font-poppins font-semibold  justify-center cursor-pointer z-[100] items-center ss:w-[100px] xs:w-[80px] w-[65px] ${active===index?"text-white":"text-black"}`} onClick={() => activeTab(tab, index)}
          >
            {tab}
            
          </div>
        ))}
        <div className={`bg-gradient  h-[40px] ss:w-[100px] xs:w-[80px] w-[65px] absolute rounded-2xl transition-all duration-500 ease-in-out`} style={{left:position}} >

        </div>
      </div>
    </div>
  )
}

export default Switch