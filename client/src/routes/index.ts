import React from 'react';

import Main from '../pages/main/Main';

export interface IRoute {
  path?: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  MAIN_PAGE = '/',
}

export const routes: IRoute[] = [
  {
    path: RouteNames.MAIN_PAGE,
    exact: true,
    component: Main,
  },
];
