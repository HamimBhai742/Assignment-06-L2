import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import DashboardLayout from '../layout/DashboardLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Features from '../pages/Features/Features';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Overview from '../pages/Dashboard/Overview/Overview';
import ProtecedRoutes from './ProtecedRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'features',
        element: (
          <ProtecedRoutes>
            <Features />
          </ProtecedRoutes>
        ),
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'faq',
        Component: FAQ,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtecedRoutes>
        <DashboardLayout />
      </ProtecedRoutes>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
    ],
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/login',
    Component: Login,
  },
]);
