import { ExampleAction, ExampleActionsEnum, ExampleState } from './types';

const initialState: ExampleState = {
  test: '',
};

export default function exampleReducer(
  state = initialState,
  action: ExampleAction,
): ExampleState {
  switch (action.type) {
    case ExampleActionsEnum.EXAMPLE_ACTION:
      return { ...state, test: action.payload };
    default:
      return state;
  }
}
