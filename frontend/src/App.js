import { Login, Register, PairMarc1, MainMenu, Control, ProtectedRoute, ForgetPassword, Marc1IsPairedRoute, Videos, Notes } from './services/export/exportPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./services/firebase/AuthContext";
import Recordings from './pages/Recordings';
import RecordedVideo from './pages/RecordedVideo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/pairMarc1"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <PairMarc1 />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/mainmenu"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <MainMenu />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/mainmenu/Notes"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <Notes />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/mainmenu/recordings/:videoId"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <RecordedVideo />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/mainmenu/Recordings"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <Recordings />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/mainmenu/Control"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <Control />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            } />
          <Route path="/"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <Login />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/register"
            element={
              <ProtectedRoute>
                <Marc1IsPairedRoute>
                  <Register />
                </Marc1IsPairedRoute>
              </ProtectedRoute>
            }
          />
          {/* use these for testing purposes and comment the protected routes */}
          {/* <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/control" element={<Control />} />
          <Route path="/pairMarc1" element={<PairMarc1 />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/mainmenu/Recordings" element={<Recordings />} />
          <Route path="/mainmenu/Notes" element={<Notes />} />
          <Route path="/mainmenu/recordings/:id" element={<RecordedVideo />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
