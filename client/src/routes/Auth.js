import MinimalLayout from '../layout/MinimalLayout';
import Login from '../views/Login/index.jsx';
import Signup from '../views/Signup/index.jsx';
import User from '../views/user/index.js';
const LoginRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/signup',
            element: <Signup />
        }
    ]
};
export default LoginRoutes;
