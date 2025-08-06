import AuthFailure from "../pages/auth/auth-failed";
import AuthSuccess from "../pages/auth/auth-successful";
import ChangePasswordPage from "../pages/auth/change-password";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/home/page";
import NovelPage from "../pages/novel/page";
import ProfilePage from "../pages/profile/page";
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
    url: "/reset-password",
    component: <ChangePasswordPage />,
  },
  {
    url: "/auth/success",
    component: <AuthSuccess />,
  },
  {
    url: "/auth/error",
    component: <AuthFailure />,
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
  {
    url: "/profile",
    component: <ProfilePage />,
  },
  {
    url: "/novel",
    component: <NovelPage />,
  },
];

export default routes;
