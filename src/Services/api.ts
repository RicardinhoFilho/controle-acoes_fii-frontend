import axios from 'axios';
import { base_url_api } from '../Utils/basesUrls';

export default axios.create({
  baseURL:base_url_api
});