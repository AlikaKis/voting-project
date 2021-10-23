import { AxiosError } from 'axios';

import VotingService from '../../../api/votingService';
import { AppDispatch } from '../..';
import {
  AuthActionsEnum,
  ClearAuthAction,
  SaveNewTokenAction,
  SetIsTokenRefreshingAction,
  SetIsTryingToLoginAction,
  SetLoginErrorAction,
  SetRefreshingErrorAction,
} from './types';

export const AuthActionCreators = {
  clearAuthState: (): ClearAuthAction => ({
    type: AuthActionsEnum.CLEAR_AUTH_ACTION,
  }),
  saveNewToken: (access_token: string): SaveNewTokenAction => ({
    type: AuthActionsEnum.SAVE_NEW_TOKEN_ACTION,
    payload: access_token,
  }),
  setIsRefreshing: (isRefreshing: boolean): SetIsTokenRefreshingAction => ({
    type: AuthActionsEnum.IS_REFRESHING_ACTION,
    payload: isRefreshing,
  }),
  setIsTryingLogin: (isTryingLogin: boolean): SetIsTryingToLoginAction => ({
    type: AuthActionsEnum.IS_TRYING_LOGIN_ACTION,
    payload: isTryingLogin,
  }),
  setLoginError: (error: string): SetLoginErrorAction => ({
    type: AuthActionsEnum.ERROR_LOGIN_ACTION,
    payload: error,
  }),
  setRefreshingError: (error: string): SetRefreshingErrorAction => ({
    type: AuthActionsEnum.ERROR_REFRESH_ACTION,
    payload: error,
  }),
  fetchRefreshTokens: () => async (dispatch: AppDispatch) => {
    try {
      AuthActionCreators.setIsRefreshing(true);
      const result = await VotingService.refreshTokens();
      dispatch(AuthActionCreators.saveNewToken(result.data.access_token));
      AuthActionCreators.setIsRefreshing(false);
    } catch (error) {
      dispatch(AuthActionCreators.clearAuthState());
      AuthActionCreators.setRefreshingError((error as AxiosError<string>).message);
    }
  },
  fetchLogin: (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      AuthActionCreators.setIsTryingLogin(true);
      const result = await VotingService.login(login, password);
      dispatch(AuthActionCreators.saveNewToken(result.data.access_token));
    } catch (error) {
      AuthActionCreators.setIsTryingLogin(false);
      AuthActionCreators.setLoginError((error as AxiosError<string>).message);
    }
  },
  fetchLogout: () => async (dispatch: AppDispatch) => {
    try {
      AuthActionCreators.setIsTryingLogin(true);
      await VotingService.logout();
      dispatch(AuthActionCreators.clearAuthState());
    } catch (error) {
      dispatch(AuthActionCreators.clearAuthState());
    }
  },
};
