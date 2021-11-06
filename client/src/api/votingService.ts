import axios, { AxiosError, AxiosResponse } from 'axios';

import { store } from '../store';
import { AuthActionCreators } from '../store/reducers/authReducer/action-creators';

const { dispatch } = store;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum API_URLS {
  REFRESH_TOKENS = '/auth/refresh-tokens',
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  CANDIDATES_AND_AREAS_INFO = '/candidate-va-info',
  DISTRICTS_TURNOUT = '/districts-turnout',
  RESULTS_INFO = '/results',
}

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  if (!error.response) {
    return new Promise((_, reject) => {
      reject(error);
    });
  }

  if (error.response.status === 403) {
    if (error.response.config.url === API_URLS.LOGIN) {
      return new Promise((_, reject) => {
        reject(error);
      });
    } else if (error.response.config.url === API_URLS.REFRESH_TOKENS) {
      dispatch(AuthActionCreators.clearAuthState());
      return new Promise((_, reject) => {
        reject(error);
      });
    } else {
      try {
        const res = await VotingService.refreshTokens();
        dispatch(AuthActionCreators.saveNewToken(res.data.access_token));
        error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api.request(error.config);
      } catch (_) {
        return new Promise((_, reject) => {
          reject(error);
        });
      }
    }
  } else {
    return new Promise((_, reject) => {
      reject(error);
    });
  }
});

export default class VotingService {
  static async refreshTokens(): Promise<AxiosResponse<{ access_token: string }>> {
    return api.get<{ access_token: string }>(API_URLS.REFRESH_TOKENS);
  }
  static async login(
    login: string,
    password: string,
  ): Promise<AxiosResponse<{ access_token: string }>> {
    return api.post<{ access_token: string }>(API_URLS.LOGIN, {
      login,
      password,
    });
  }

  static async getUserInfo(access_token: string): Promise<AxiosResponse<any>> {
    return api.get<any>('/user-info', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  static async getCandidatesAndAreasInfo(): Promise<
    AxiosResponse<{
      info: Array<{
        candidate_id: number;
        candidate: string;
        consigment: string;
      }>;
      count_opened: number;
      count_people: number;
    }>
  > {
    return api.get<{
      info: Array<{
        candidate_id: number;
        candidate: string;
        consigment: string;
      }>;
      count_opened: number;
      count_people: number;
    }>(API_URLS.CANDIDATES_AND_AREAS_INFO);
  }

  static async getDistrictsTurnout(): Promise<AxiosResponse<any>> {
    return api.get<{
      districts_turnout: Array<{
        district: string;
        turnout: number;
      }>;
    }>(API_URLS.DISTRICTS_TURNOUT);
  }

  static async getResultsInfo(): Promise<
    AxiosResponse<{
      candidate_results: Array<{
        candidate_id: number;
        candidate: string;
        result: number;
      }>;
      turnout: number;
      checked_bulletins_percentage: number;
    }>
  > {
    return api.get<{
      candidate_results: Array<{
        candidate_id: number;
        candidate: string;
        result: number;
      }>;
      turnout: number;
      checked_bulletins_percentage: number;
    }>(API_URLS.RESULTS_INFO);
  }

  static async logout(): Promise<AxiosResponse<{ message: string }>> {
    return api.get<{ message: string }>(API_URLS.LOGOUT);
  }
}
