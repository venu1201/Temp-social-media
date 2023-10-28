import * as api from '../api/meme.js';
import { all_posts } from '../reducers/index.js';

export const fetchtopheadlines = (category, random) => async (dispatch) => {
    try {
        if(category!==undefined)
        {
            const {data} = await api.fetchTopHeadlines(category);
            const x=data.articles[Math.floor(Math.random() * 6)]
            console.log(data);
            random(x)
        }
        else
        {
            console.log("hmmm")
            const {data} = await api.fetchTopHeadlines();
            const x=data.articles[Math.floor(Math.random() * 6)]
            console.log(data);
            random(x)

        }
    //   setisSignin(!isSignin)
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };
  export const fetchtopheadlinesbycategory = (category, random) => async (dispatch) => {
    try {
        if(category!==undefined)
        {
            const {data} = await api.fetchTopHeadlines(category);
            
            random(data.articles)
        }
        else
        {
            console.log("hmmm")
            const {data} = await api.fetchTopHeadlines();
            random(data.articles)

        }
    //   setisSignin(!isSignin)
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };

//   export const getuserbyid = (username,setpeopledata,bool)=>async(dispatch)=>{
//     try {
     
  
//       const {data}=await api.getuserbyid(username);
//       if(data)
//       setpeopledata(data.result);
//       if(bool)
//       {
//         dispatch(profile_data(data.result));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
