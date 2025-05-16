import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App.jsx';
import Home from './Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ProtectedRouteTeacher from './ProtectedRouteTeacher.jsx';

// === Student Components ===
import SignupForm from './components/Student/SignUp-Login/jsx/SignUpForm.jsx';
import LoginPage from './components/Student/SignUp-Login/jsx/LoginForm.jsx';
import ForgetPassword from './components/Student/SignUp-Login/jsx/ForgetPassword.jsx';
import EmailVerificationOTP from './components/Student/SignUp-Login/jsx/EmailVerificationOTP.jsx';
import PasswordOTP from './components/Student/SignUp-Login/jsx/PasswordOTP.jsx';
import NewPassword from './components/Student/SignUp-Login/jsx/NewPassword.jsx';
import StudentHome from './components/Student/Home/jsx/StudentHome.jsx';
import CourseListPage from './components/Student/Course/jsx/CourseListPage.jsx';
import CourseDetailsPage from './components/Student/CourseDetails/CourseDetailsPage.jsx';

// === Teacher Components ===
import LoginPageTeacher from './components/Teacher/SignUp-Login/jsx/LoginForm.jsx';
import SignupFormTeacher from './components/Teacher/SignUp-Login/jsx/SignUpForm.jsx';
import ForgetPasswordTeacher from './components/Teacher/SignUp-Login/jsx/ForgetPassword.jsx';
import EmailVerificationOTPTeacher from './components/Teacher/SignUp-Login/jsx/EmailVerificationOTP.jsx';
import PasswordOTPTeacher from './components/Teacher/SignUp-Login/jsx/PasswordOTP.jsx';
import NewPasswordTeacher from './components/Teacher/SignUp-Login/jsx/NewPassword.jsx';
import TeacherHome from './components/Teacher/TeacherHome/jsx/TeacherHome.jsx';
import CourseDetails from './components/Teacher/TeacherHome/jsx/CourseDetails.jsx';
import CourseForm from './components/Teacher/TeacherHome/jsx/CourseForm.jsx';

// === Grouped Student Routes ===
const studentRoutes = [
  { path: "/students/home", element: <ProtectedRoute><StudentHome /></ProtectedRoute> },
  { path: "/students/courses", element: <ProtectedRoute><CourseListPage /></ProtectedRoute> },
  { path: "/students/course-details", element: <ProtectedRoute><CourseDetailsPage /></ProtectedRoute> },
  { path: "/students/signup", element: <SignupForm /> },
  { path: "/students/login", element: <LoginPage /> },
  { path: "/students/forget-password", element: <ForgetPassword /> },
  { path: "/students/email-verification", element: <EmailVerificationOTP /> },
  { path: "/students/password-otp", element: <PasswordOTP /> },
  { path: "/students/reset-password", element: <NewPassword /> },
];

// === Grouped Teacher Routes ===
const teacherRoutes = [
  { path: "/teachers/login", element: <LoginPageTeacher /> },
  { path: "/teachers/signup", element: <SignupFormTeacher /> },
  { path: "/teachers/forget-password", element: <ForgetPasswordTeacher /> },
  { path: "/teachers/email-verification", element: <EmailVerificationOTPTeacher /> },
  { path: "/teachers/password-otp", element: <PasswordOTPTeacher /> },
  { path: "/teachers/reset-password", element: <NewPasswordTeacher /> },
  { path: "/teachers/home", element: <ProtectedRouteTeacher><TeacherHome /></ProtectedRouteTeacher> },
  { path: "/teachers/course-details", element: <ProtectedRouteTeacher><CourseDetails /></ProtectedRouteTeacher> },
  { path: "/teachers/add-course", element: <ProtectedRouteTeacher><CourseForm /></ProtectedRouteTeacher> },
];


// === Final Router Setup ===
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      ...studentRoutes,
      ...teacherRoutes,
    ],
  },
]);

// === Render App ===
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
    </>
  </StrictMode>
);