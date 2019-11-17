import axios from 'axios';

export default axios.create({
   baseURL: 'http://shortsrecipes.com/services/api'
});