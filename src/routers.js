import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { CoursePage } from "./pages/CoursePage";
import { AssignmentPage } from "./pages/AssignmentPage";
import { GradesPage } from "./pages/GradesPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "course/:courseId", Component: CoursePage },
      { path: "course/:courseId/assignment/:assignmentId", Component: AssignmentPage },
      { path: "grades", Component: GradesPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
