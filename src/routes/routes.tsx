import { Navigate, createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "../constants/index";
import MainLayout from "../layout/mainLayout/MainLayout";
import MainLoadingScreen from "../components/mainLoadingScreen/MainLoadingScreen";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATH.root,
        element: <Navigate to={`/${ROUTE_PATH.browse}`} />,
      },
      {
        path: "browse",
        element:  <MainLayout />,
      },
    ],
  },
  {
    path: "*",
    element: <MainLoadingScreen />,
  }
]);

export default router;
