import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import HowItWorks from './components/how_it_works';
import ListingsPage from './components/listings';
import LandingPage from './components/LandingPage';
import Login from './components/login';
import AuditorDashboard from './components/auditor';
import VerifyPage from './components/verify';
import Navbar from './components/navBar';
import Register from './components/register';
import Profile from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/How It Works" element={<HowItWorks />} />
          <Route path="/Listings" element={<ListingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auditors" element={<AuditorDashboard />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
