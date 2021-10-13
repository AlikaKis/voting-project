// import { IExapmle } from '../../../models/IExapmle';

export interface ExampleState {
  test: string;
}

export enum ExampleActionsEnum {
  EXAMPLE_ACTION = 'EXAMPLE_ACTION',
}

export interface SetExampleAction {
  type: ExampleActionsEnum.EXAMPLE_ACTION;
  payload: string;
}

export type ExampleAction = SetExampleAction;
