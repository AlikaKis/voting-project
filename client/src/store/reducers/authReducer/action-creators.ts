import VotingService from '../../../api/votingService';
import { AppDispatch } from '../..';
import { AuthActionsEnum, ClearAuthAction, SaveNewTokenAction } from './types';

export const AuthActionCreators = {
  clearAuthState: (): ClearAuthAction => ({
    type: AuthActionsEnum.CLEAR_AUTH_ACTION,
  }),
  saveNewToken: (access_token: string): SaveNewTokenAction => ({
    type: AuthActionsEnum.SAVE_NEW_TOKEN_ACTION,
    payload: access_token,
  }),
  fetchRefreshTokens: () => async (dispatch: AppDispatch) => {
    try {
      const result = await VotingService.refreshTokens();
      dispatch(AuthActionCreators.saveNewToken(result.data.access_token));
    } catch (error) {
      dispatch(AuthActionCreators.clearAuthState());
    }
  },
};
