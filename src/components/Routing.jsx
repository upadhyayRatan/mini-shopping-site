import react from 'react'
import {createBrowserRouter, createHashRouter} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home'
import TechDiff from './TechDiff';
import Cart from './Cart';
import Invoice from './Invoice';
import Orders from './Orders';

const routes = createBrowserRouter([
    {
        path:'/',
        element: <Register/>,
        errorElement:<TechDiff/>
    },
    {
        path:'/login',
        element:<Login/>,
        errorElement:<TechDiff/>
    },
    {
        path:'/home',
        element:<Home/>,
        errorElement:<TechDiff/>
    },
    {
        path:'/cart',
        element:<Cart/>,
        errorElement:<TechDiff/>
    },
    {
        path:'/techdiff',
        element:<TechDiff/>
    },
    {
        path:'/invoice',
        element:<Invoice/>
    },
    {
        path:'/orders',
        element:<Orders/>
    }
])

export default routes;