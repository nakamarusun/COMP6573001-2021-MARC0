import { Login, Register, PairMarc1, MainMenu, Control, ProtectedRoute, ForgetPassword, Marc1IsPairedRoute } from './services/export/exportPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./services/firebase/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/mainmenu"
            element={
              <Marc1IsPairedRoute>
                <ProtectedRoute>
                  <MainMenu />
                </ProtectedRoute>
              </Marc1IsPairedRoute>
            }
          /> */}
          <Route path="/pairMarc1"
            element={
              <ProtectedRoute>
                <PairMarc1 />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/control"
            element={
              <Marc1IsPairedRoute>
                <ProtectedRoute>
                  <Control />
                </ProtectedRoute>
              </Marc1IsPairedRoute>
            } /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/control" element={<Control />} />
          <Route path="/mainmenu" element={<MainMenu />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
