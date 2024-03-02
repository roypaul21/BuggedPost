import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from 'react';


const router = createBrowserRouter([
    {
        path: "/",
        Component: lazy(() => import('./pages/LandingPage'))
    },
    
    {
        path: "/",
        Component: lazy(() => import('./components/AdminLayout/AdminLayout.jsx')),
        children: [
            {
                path: "/",
                Component: lazy(() => import('./components/AdminLayout/Navbar.jsx')),
                children: [
                    {
                        path: "/home-admin",
                        Component: lazy(() => import('./pages/HomePage/HomeAdmin'))
                    },
                    {
                        path: "/create-blog",
                        Component: lazy(() => import    ('./pages/CreateBlogPage'))
                    },
                ]
            }

        ]
    },

    {
        path: "*",
        Component: lazy(() => import('./pages/NotFoundPage/NotFound.jsx'))
    }

])

export default router;