import axios from 'axios';
import env from '../config/env';

export const apiKey = env.EXPO_PUBLIC_API_KEY;
export const apiProjectID = env.EXPO_PUBLIC_PROJECT_ID;

export const apiAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
});

export const apiFirestore = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${apiProjectID}/databases/(default)/`,
});
