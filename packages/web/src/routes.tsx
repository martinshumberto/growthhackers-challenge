import { RouteObject } from 'react-router-dom';
import Default from '@/layouts/Default';
import Home from '@/pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Default />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: 'produtos',
        element: <Products />,
      },
      {
        path: 'categorias',
        element: <Categories />,
      },
    ],
  },
];

export default routes;
