const axios = require('axios');

const callMemeAPI = async () => {
  const options = {
    method: 'GET',
    url: 'https://ronreiter-meme-generator.p.rapidapi.com/meme',
    params: {
      top: 'Top Text',
      bottom: 'Bottom Text',
      meme: 'Condescending-Wonka',
      font_size: '50',
      font: 'Impact'
    },
    headers: {
      'X-RapidAPI-Key': '747933dc03mshd3ed80e14367ed6p13f472jsnf77606656aec',
      'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default callMemeAPI;
