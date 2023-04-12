// assets
import { IconTypography, IconPalette, IconShadow, IconDashboard } from '@tabler/icons';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import EventIcon from '@mui/icons-material/Event';

// constant

// constant
const icons = {
    EventIcon,
    RequestQuoteIcon,
    LoyaltyIcon,
    HandshakeIcon,
    DashboardIcon,
    IconDashboard,
    ReviewsIcon,
    IconTypography,
    IconPalette,
    IconShadow
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'menu',
    // title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/pages/dashboard/default',
            icon: icons.DashboardIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'account',
        //     title: 'Account',
        //     type: 'item',
        //     url: '/pages/account/user',
        //     icon: icons.DashboardIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'account',
        //     title: 'Account',
        //     type: 'item',
        //     url: '/pages/user/account',
        //     icon: icons.DashboardIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'cr',
            title: 'Commercial Review',
            type: 'collapse',
            icon: icons.ReviewsIcon,
            children: [
                // {
                //     id: 'cr-dash',
                //     title: 'Dashboard',
                //     type: 'item',
                //     url: '/pages/CommercialReview/Dashboard',
                //     breadcrumbs: false
                // },
                {
                    id: 'cr-ar',
                    title: 'Add Review',
                    type: 'item',
                    url: '/pages/CommercialReview/AddReview',
                    breadcrumbs: false
                },
                {
                    id: 'cr-view',
                    title: 'View Commercial Review',
                    type: 'item',
                    url: '/pages/CommercialReview/ViewReview',
                    breadcrumbs: false
                }
                // {
                //     id: 'cr-sim-repo',
                //     title: 'Sim Repository',
                //     type: 'item',
                //     url: '/pages/CommercialReview/simRepo',
                //     breadcrumbs: false
                // }
            ]
        },
        {
            id: 'pp',
            title: 'Partner Provisioning',
            type: 'collapse',
            icon: icons.HandshakeIcon,
            children: [
                // {
                //     id: 'pp-dash',
                //     title: 'Dashboard',
                //     type: 'item',
                //     url: '/pages/PatnerProvisioning/Dashboard',
                //     breadcrumbs: false
                // },
                {
                    id: 'pp-simRepo',
                    title: 'Sim Repository',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/simRepo',
                    breadcrumbs: false
                },
                {
                    id: 'pp-ini',
                    title: 'Intialization',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/intialization',
                    breadcrumbs: false
                },
                {
                    id: 'pp-view',
                    title: 'View Intialization',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/view-intialization',
                    breadcrumbs: false
                },
                {
                    id: 'pp-test',
                    title: 'Testing',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/testing',
                    breadcrumbs: false
                },
                {
                    id: 'pp-tcc',
                    title: 'TCC',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/tcc',
                    breadcrumbs: false
                },
                {
                    id: 'pp-completed',
                    title: 'View Completed',
                    type: 'item',
                    url: '/pages/PatnerProvisioning/completed',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'sp',
            title: 'Subscriber Provisioning',
            type: 'collapse',
            icon: icons.LoyaltyIcon,
            children: [
                {
                    id: 'sp-upload',
                    title: 'Launch CLL',
                    type: 'item',
                    url: '/pages/SubscriberProvisioning/first'
                },
                {
                    id: 'sp-view',
                    title: 'View Launch',
                    type: 'item',
                    url: '/pages/SubscriberProvisioning/view'
                }
            ]
        },
        {
            id: 'ceg',
            title: 'Chargeable Event Generation',
            type: 'collapse',
            icon: icons.EventIcon,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'pbs',
            title: 'Partner Billing & Settlement',
            type: 'collapse',
            icon: icons.RequestQuoteIcon,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
