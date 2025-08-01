import ChangePasswordPage from "../pages/auth/change-password";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/home/page";
import Test from "../pages/test";

const routes = [
  // auth
  {
    url: "/login",
    component: <LoginPage />,
  },
  {
    url: "/register",
    component: <RegisterPage />,
  },
  {
    url: "/forgot-password",
    component: <ForgotPasswordPage />,
  },
  {
    url: "/change-password",
    component: <ChangePasswordPage />,
  },

  //   pages
  {
    url: "/",
    component: <HomePage />,
  },
  {
    url: "/test",
    component: <Test />,
  },
];

export default routes;
