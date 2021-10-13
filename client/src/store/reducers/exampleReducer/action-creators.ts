import VotingService from '../../../api/votingService';
// import { IExapmle } from '../../../models/IExapmle';
import { AppDispatch } from '../..';
import { ExampleActionsEnum, SetExampleAction } from './types';

export const ExampleActionCreators = {
  setExample: (payload: string): SetExampleAction => ({
    type: ExampleActionsEnum.EXAMPLE_ACTION,
    payload,
  }),
  fetchExample: () => async (dispatch: AppDispatch) => {
    try {
      VotingService.testFunction();
      dispatch(ExampleActionCreators.setExample(''));
    } catch (error) {
      console.error(error);
    }
  },
};
