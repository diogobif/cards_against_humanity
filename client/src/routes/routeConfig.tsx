import { Outlet, RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';

const baseRoutes: RouteObject[] = [{ index: true, element: <Home /> }];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    children: baseRoutes,
  },
];
