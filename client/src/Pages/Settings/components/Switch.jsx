import React,{useState,useRef, useEffect} from 'react'

const Switch = ({data,setprivacy}) => {
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
    size=curr();
    if(size.current<330)
    {
      return 65;
    }
    else if(size.current<850)
    {
      return 80;
    }
    return 50;
  }
  const activeTab = (tab, index) => {
    setposition(index * func(windowWidth));
    setTimeout(() => {
        setactive(index);
    }, 350);
    setprivacy((prev)=>!prev);
};
  return (
    <div className='ss:w-[103px] xs:w-[83px] w-[73px]  rounded-2xl flex justify-center items-center bg-white h-[43px]'>
      <div className='relative ss:w-[100px] xs:w-[80px] w-[70px] h-full flex justify-evenly items-center'>
        {data.map((tab,index)=>(
          
          <div key={index} className={ `flex h-full font-poppins font-semibold  justify-center cursor-pointer z-[100] items-center ss:w-[100px] xs:w-[80px] w-[65px] ${active===index?"text-white":"text-black"}`} onClick={() => activeTab(tab, index)}
          >
            {tab}
            
          </div>
        ))}
        <div className={`bg-gradient  h-[40px] ss:w-[50px] xs:w-[40px] w-[35px] absolute rounded-2xl transition-all duration-500 ease-in-out`} style={{left:position}} >

        </div>
      </div>
    </div>
  )
}

export default Switch