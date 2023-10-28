import axios from 'axios';

const NewsAPI = axios.create({ baseURL: 'https://newsapi.org/v2' });

const apiKey = 'aef6d7fa2a974eeab90111c226b94ecb';

export const fetchTopHeadlines = (category) => {
  console.log(category);
  if (category) {
    return NewsAPI.get(`/top-headlines?country=in&category=${category}&apiKey=${apiKey}`);
  } else {
    console.log("hmmmkkk");
    console.log(`https://newsapi.org/v2` + `/top-headlines?country=in&apiKey=${apiKey}`);
    return NewsAPI.get(`/top-headlines?country=in&apiKey=${apiKey}`);
  }
};
