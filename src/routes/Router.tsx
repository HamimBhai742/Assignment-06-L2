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
import Overview from '../pages/Dashboard/UserDashboard/Overview/Overview';
import Deposit from '../pages/Dashboard/UserDashboard/Deposit/Deposit';
import Withdraw from '../pages/Dashboard/UserDashboard/Withdraw/Withdraw';
import SendMoney from '../pages/Dashboard/UserDashboard/SendMoney/SendMoney';
import Transactions from '../pages/Dashboard/UserDashboard/Transactions/Transactions';
import Profile from '../pages/Dashboard/UserDashboard/Profile/Profile';
import AgentOverview from '../pages/Dashboard/AgentDashboard/Overview';
import TestAgentDashboard from '../pages/TestAgentDashboard';
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
        Component: Features,
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
  {
    path: '/test-agent',
    Component: TestAgentDashboard,
  },
  {
    path: '/agent-dashboard',
    element: (
      <ProtecedRoutes>
        <DashboardLayout />
      </ProtecedRoutes>
    ),
    children: [
      {
        index: true,
        Component: AgentOverview,
      },
    ],
  },
]);
