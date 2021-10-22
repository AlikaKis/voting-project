export interface AuthState {
  access_token: string | null;
  isRefreshing: boolean;
  error: string | null;
}

export enum AuthActionsEnum {
  CLEAR_AUTH_ACTION = 'CLEAR_AUTH_ACTION',
  SAVE_NEW_TOKEN_ACTION = 'SAVE_NEW_TOKEN_ACTION',
}

export interface ClearAuthAction {
  type: AuthActionsEnum.CLEAR_AUTH_ACTION;
}

export interface SaveNewTokenAction {
  type: AuthActionsEnum.SAVE_NEW_TOKEN_ACTION;
  payload: string;
}

export type AuthAction = ClearAuthAction | SaveNewTokenAction;
