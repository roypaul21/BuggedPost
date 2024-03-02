import {Outlet, Navigate } from "react-router-dom";

export default function AdminLayout() {

    return (
        <main>
            <Outlet />
        </main>
    )
}