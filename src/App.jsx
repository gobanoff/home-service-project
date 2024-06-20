
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import AboutUs from "./components/pages/AboutUs";
import { ROUTES } from "./components/router/consts";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./components/pages/ErrorPage";
import Login from "./components/pages/Login";
import SearchCategory from "./components/pages/SearchCategory";

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
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.SEARCH_CATEGORY,
        element: <SearchCategory />,
      },
    ],
  },
]);

const App = () => {
 
  return <RouterProvider router={router} />;
};

export default App;