import axios from 'axios';
import config from '../../config';

const noAuth = axios.create({ baseURL: config.apiOrigin });

export default noAuth;
