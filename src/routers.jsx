import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import GradesPage from "./components/GradesPage/GradesPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import App from "./App";
import CoursePage from "./components/CoursePage/CoursePage";

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
