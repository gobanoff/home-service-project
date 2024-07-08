
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import { ROUTES } from "./router/consts";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SearchCategory from "./pages/SearchCategory";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SERVICES,
        element: <Services />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: ROUTES.SEARCH_CATEGORY,
        element: <SearchCategory />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
 
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;