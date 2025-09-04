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
import Deposit from '../pages/Dashboard/Deposit/Deposit';
import Withdraw from '../pages/Dashboard/Withdraw/Withdraw';
import SendMoney from '../pages/Dashboard/SendMoney/SendMoney';
import Transactions from '../pages/Dashboard/Transactions/Transactions';
import Profile from '../pages/Dashboard/Profile/Profile';
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
      {
        path: 'deposit',
        Component: Deposit,
      },
      {
        path: 'withdraw',
        Component: Withdraw,
      },
      {
        path: 'send',
        Component: SendMoney,
      },
      {
        path: 'transactions',
        Component: Transactions,
      },
      {
        path: 'profile',
        Component: Profile,
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
