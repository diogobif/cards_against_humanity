import { Outlet, RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { RoutesEnum } from './routes';
import { Room } from '../pages/Room';

const baseRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: RoutesEnum.JOIN_ROOM, element: <Room /> },
];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    children: baseRoutes,
  },
];
