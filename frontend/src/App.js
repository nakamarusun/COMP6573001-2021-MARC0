import { Login, Register, PairMarc1, MainMenu, Control, ProtectedRoute, ForgetPassword } from './services/export/exportPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./services/firebase/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/mainmenu"
            element={
              <ProtectedRoute>
                <MainMenu />
              </ProtectedRoute>
            }
          />
          <Route path="/pairMarc1"
            element={
              <ProtectedRoute>
                <PairMarc1 />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/control"
            element={
              <ProtectedRoute>
                <Control />
              </ProtectedRoute>
            } /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/control" element={<Control />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
