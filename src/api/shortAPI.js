import axios from 'axios';

export default axios.create({
   baseURL: 'https://shortsrecipes.com/services/api'
});