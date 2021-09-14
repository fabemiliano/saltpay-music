import axios from 'axios';

const getSongs = async () => {
  const { data } = await axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
  return data;
};

export default getSongs;
