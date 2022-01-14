import { Login, Register, PairMarc1, MainMenu, Control } from './services/export/exportPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
