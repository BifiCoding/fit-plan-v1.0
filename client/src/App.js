import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Payment from './Payment';
import HomePage from '../src/pages/HomePage'
import FormPaid from '../src/pages/FormPaid'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Header from './components/Header';




function App() {
  return (
    <main>
      <BrowserRouter>
      <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/formpaid" element={<FormPaid />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
