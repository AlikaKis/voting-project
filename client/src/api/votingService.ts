import axios, { AxiosError, AxiosResponse } from 'axios';

import { RouteNames } from '../routes';
import history from '../utils/history';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export enum API_URLS {
  REFRESH_TOKENS = '/auth/refresh-tokens',
}

api.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),
  (error: AxiosError) => {
    if (!error.response) {
      return new Promise((_, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      if (error.response.config.url === API_URLS.REFRESH_TOKENS) {
        if (history.location.pathname === RouteNames.EMPLOYEE_PAGE)
          history.push(RouteNames.LOGIN_PAGE);
      }
      return new Promise((_, reject) => {
        reject(error);
      });
    } else {
      return new Promise((_, reject) => {
        reject(error);
      });
    }
  },
);

export default class VotingService {
  static async refreshTokens(): Promise<AxiosResponse<{ access_token: string }>> {
    return api.get<{ access_token: string }>(API_URLS.REFRESH_TOKENS);
  }
}
