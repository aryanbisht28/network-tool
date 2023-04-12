import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
// routes
import MainRoutes from './MainRoutes';
import Auth from './Auth';
import User from './User';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, Auth, User]);
}
