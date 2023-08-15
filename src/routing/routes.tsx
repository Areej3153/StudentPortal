import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    { path: "/", element: <LoginPage />, errorElement: <ErrorPage />},
    { path: "/register", element: <RegisterPage />},
    { path: "/dashboard", element: <HomePage />}
])

export default router;