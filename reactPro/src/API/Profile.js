import axios from 'axios';

export const fetchProfile = () => axios.get('/api/profile');
