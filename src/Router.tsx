import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { OntoTreeViewDemoPage } from './pages/OntoTreeViewDemo.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/onto-tree-view-demo',
    element: <OntoTreeViewDemoPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
