import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import ContactUs from './component/ContactUs';
import FloatingContact from './component/FloatingContact';
import HomeBang from './pages/HomeBang';
import DemoPageBang from './pages/DemoPageBang';
import ContactUsBang from './component/ContactUsBang';
import Dashboard from './pages/Dashboard';
import ThankYou from './pages/ThankYou';
import ThankYouBang from './pages/ThankYouBang';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Bangla Routes */}
        <Route path="/bn" element={<HomeBang />} />
        <Route path="/bn/demo" element={<DemoPageBang />} />
        <Route path="/bn/contact" element={<ContactUsBang />} />
        <Route path="/bn/thank-you" element={<ThankYouBang />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />

      </Routes>
      <FloatingContact />
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
