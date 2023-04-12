import { lazy } from 'react';
import Review from '../views/commercialreview/index.js';
import ViewCR from 'views/commercialreview/ViewCR/ViewCR.js';
import CommercialDashboard from 'views/commercialreview/dashboard';
import DashboardPartner from 'views/pp/dashboard';
import Testing from 'views/pp/testing/index.js';
import ViewIni from 'views/pp/view-initialization';
import Tcc from 'views/pp/tcc';
import Subpro from 'views/subscriber/first';
import SubView from 'views/subscriber/view';
import Completed from 'views/pp/completed';
import SimRepo from 'views/pp/simRepo';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/Login/index.jsx';
import { element } from 'prop-types';
import User from '../views/user/index.js';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const CommercialReviewAddReview = Loadable(lazy(() => import('views/commercialreview')));
const PatnerProvisioningIni = Loadable(lazy(() => import('views/pp/initialization')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/pages',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'account',
            children: [
                {
                    path: 'user',
                    element: <User />
                }
            ]
        },
        {
            path: 'CommercialReview',
            children: [
                {
                    path: 'Dashboard',
                    element: <CommercialDashboard />
                },
                {
                    path: 'AddReview',
                    element: <Review />
                },
                {
                    path: 'ViewReview',
                    element: <ViewCR />
                }
            ]
        },
        {
            path: 'PatnerProvisioning',
            children: [
                {
                    path: 'simRepo',
                    element: <SimRepo />
                },
                {
                    path: 'Dashboard',
                    element: <DashboardPartner />
                },
                {
                    path: 'intialization',
                    element: <PatnerProvisioningIni />
                },
                {
                    path: 'view-intialization',
                    element: <ViewIni />
                },
                {
                    path: 'testing',
                    element: <Testing />
                },
                {
                    path: 'tcc',
                    element: <Tcc />
                },
                {
                    path: 'completed',
                    element: <Completed />
                }
            ]
        },
        {
            path: 'SubscriberProvisioning',
            children: [
                {
                    path: 'first',
                    element: <Subpro />
                },
                {
                    path: 'view',
                    element: <SubView />
                }
            ]
        }
    ]
};

export default MainRoutes;
