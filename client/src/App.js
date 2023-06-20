import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Payment from './Payment';
import HomePage from '../src/pages/HomePage'
import FormPaid from '../src/pages/FormPaid'



function App() {
  return (
    <main>
      {/* //test */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/formpaid" element={<FormPaid />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
