import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import { routes } from "./routes"

export const AppRouter = () => {
    const router = createBrowserRouter(routes)
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}