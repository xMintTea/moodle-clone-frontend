import { createBrowserRouter } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage/ProfilePage"
import GradesPage from "./pages/GradesPage/GradesPage"
import Dashboard from "./components/UI/Dashboard/Dashboard"
import CoursePage from "./pages/CoursePage/CoursePage"
import AssigmentPage from "./pages/AssignmentPage/AssignmentPage"


import App from "./App";



export const router = createBrowserRouter([
  {
    path: "/",
     element: <App/>,
     children: [
      {index: true, element: <Dashboard/>},
      {path: "profile", element: <ProfilePage/>},
      {path: "grades", element: <GradesPage/>},
      {path : "course/:id", element: <CoursePage/>},
      {path : "course/:course_id/assignment/:assignment_id", element: <AssigmentPage/>},
     ]
  }

]);
