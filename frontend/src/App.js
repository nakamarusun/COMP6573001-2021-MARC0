import { Login, Register, PairMarc1, MainMenu, Control, TestLogin, ProtectedRoute } from './services/export/exportPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./services/firebase/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/mainmenu"
            element={
              <ProtectedRoute>
                <MainMenu />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
