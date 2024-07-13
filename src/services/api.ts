import axios from 'axios';
import env from '../env';

export const apiKey = env.API_KEY;

export const apiAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
});

export const apiFirestore = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1/projects/training-app-codize/databases/(default)/',
});
