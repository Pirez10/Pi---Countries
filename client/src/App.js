import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import CountryDetails from './components/CountryDetails'
import FormActivity from './components/FormActivity2';

import './App.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route exact path="/detail/:id" element={<CountryDetails />} />
        <Route path='/activities' element={<FormActivity />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
