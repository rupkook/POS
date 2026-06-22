import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import ContactUs from './component/ContactUs';
import FloatingContact from './component/FloatingContact';
import HomeBang from './pages/HomeBang';
import DemoPageBang from './pages/DemoPageBang';
import ContactUsBang from './component/ContactUsBang';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Bangla Routes */}
        <Route path="/bn" element={<HomeBang />} />
        <Route path="/bn/demo" element={<DemoPageBang />} />
        <Route path="/bn/contact" element={<ContactUsBang />} />
      </Routes>
      <FloatingContact />
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
