import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { OntoTreeViewDemoPage } from './pages/OntoTreeViewDemo.page';
import { Signin } from './components/Auth/Signin';
import { Registration } from './components/Auth/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/onto-tree-view-demo',
    element: <OntoTreeViewDemoPage />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Registration />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
