import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { OntoTreeViewDemoPage } from './pages/OntoTreeViewDemo.page';
import { AuthenticationTitle } from './components/Auth/AuthenticationTitle';

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
    element: <AuthenticationTitle />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
