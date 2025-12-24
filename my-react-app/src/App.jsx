import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import HowItWorks from './components/how_it_works';
import ListingsPage from './components/listings';
import Login from './components/login';
import AuditorDashboard from './components/auditor'; // Ensure this matches filename
import VerifyPage from './components/verify'; // Ensure this matches filename

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<HowItWorks />} />
          <Route path="/contact" element={<ListingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auditors" element={<AuditorDashboard />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
