import { Outlet, RouteObject } from 'react-router-dom';
import { Login } from '../pages/Login';

const baseRoutes: RouteObject[] = [{ index: true, element: <Login /> }];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    children: baseRoutes,
  },
];
