// import logo from './logo.svg';
import React from 'react';
import './App.css';
import NavbarComponent from '../components/NavbarComponent';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import CourseInfo from '../pages/CourseInfo';
import TeeTimes from '../pages/TeeTimes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import TeeTimeConfirmation from '../pages/TeeTimeConfirmation';
import FooterComponent from '../components/FooterComponent';
import { AuthContext } from './AuthContext';
import AdminDashboard from '../pages/AdminDashboard';
import AccountManagement from '../pages/AccountManagement';
import PaymentSuccess from '../pages/PaymentSuccess';
import SquarePayment from '../pages/SquarePayment';

function LoginWrapper() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/tee_times'); // redirect on successful login
  };
  return <Login onLogin={handleLogin} />;
}


function App() {
  const { isLoggedIn, user } = React.useContext(AuthContext);
  // console.log("App rendered: isLoggedIn =", isLoggedIn, "user =", user);
  return (
    <>
      <nav>
        <NavbarComponent />
      </nav>
      <Routes>
        <Route path="/tee_times" element={<TeeTimes />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/course_info" element={<CourseInfo />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TeeTimeConfirmation" element={<TeeTimeConfirmation />} />
        <Route path="/payment_success" element={<PaymentSuccess />} />
        <Route path="/square_payment" element={<SquarePayment />} />
        <Route path="/account_management" element={
          isLoggedIn ? <AccountManagement /> : <Signup />
        } />
        <Route path="/admin" element={user?.admin ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
      <FooterComponent />
    </>
  )
}

export default App;
