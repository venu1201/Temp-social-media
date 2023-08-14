import { DateTime } from "luxon";

const API_KEY="147e7f28061e325d20d5ea29c2d507c1";
const BASE_URL="https://api.openweathermap.org/data/2.5"

const getWeatherData =(infotype,searchParams)=>{
    const url=new URL(BASE_URL+ "/"+ infotype)
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});

    return fetch(url)
    .then((res)=>res.json())
   

};

const formatCurrentWeather=(data)=>{
    const{
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity,pressure},
        name,
        clouds:{all},
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}


    }=data

    const {main:details,icon}=weather[0]

    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,country,sunrise,sunset,details,icon,speed,pressure,all}

}
// const  formatForecastWeather=(data)=>{
//     let { timezone ,daily, hourly }=data;
//     daily=daily.slice(1,6).map(d=>{
//         return{
//             title:formatToLocalTime(d.dt,timezone,'ccc'),
//             temp:d.temp.day,
//             icon:d.weather[0].icon

//         }
//     });


//     hourly=hourly.slice(1,6).map(d=>{
//         return{
//             title:formatToLocalTime(d.dt,timezone,'hh:mm a'),
//             temp:d.temp.day,
//             icon:d.weather[0].icon

//         }
//     });

//     return {timezone,daily,hourly}
// }

const GetFormattedWeatherData= async (searchParams)=>{
    const formattedWeatherData=await getWeatherData(
        'weather',searchParams).then(formatCurrentWeather)
    
    // const {lat,lon}=formattedWeatherData;
    // const formattedForecastWeather=getWeatherData('onecall',{
    //     lat,lon,
    //     exclude:"current,minutely,alerts",
    //     units:searchParams.units,
    // }).then(formatForecastWeather)

        return formattedWeatherData;
}

const formatToLocalTime=(
secs,
zone,
format="cccc, dd LLL yyyy'|Local time:'hh:mm a")=>DateTime.fromSeconds(secs).setZone(zone).toFormat(format);



const weathericontourl=(code)=>`http://openweathermap.org/img/wn/${code}@2x.png`


export default GetFormattedWeatherData;

export {weathericontourl,formatToLocalTime};

