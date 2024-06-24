
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import { ROUTES } from "./router/consts";
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SearchCategory from "./pages/SearchCategory";


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