import { AuthAction, AuthActionsEnum, AuthState } from './types';

const initialState: AuthState = {
  access_token: null,
  isRefreshing: false,
  error: null,
};

export default function exampleReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case AuthActionsEnum.CLEAR_AUTH_ACTION:
      return { ...initialState };
    case AuthActionsEnum.SAVE_NEW_TOKEN_ACTION:
      return { ...state, isRefreshing: false, access_token: action.payload };
    default:
      return state;
  }
}
