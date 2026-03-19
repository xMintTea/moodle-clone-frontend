import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./components/UI/Dashboard/Dashboard";
import GradesPage from "./components/Pages/GradesPage/GradesPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import App from "./App";
import CoursePage from "./components/Pages/CoursePage/CoursePage";

export const router = createBrowserRouter([
  {
    path: "/",
     element: <App/>,
     children: [
      {index: true, element: <Dashboard/>},
      {path: "profile", element: <ProfilePage/>},
      {path: "grades", element: <GradesPage/>},
     ]
  },
  {
    path : "/course/:id",
    element: <CoursePage/>
  }
]);
