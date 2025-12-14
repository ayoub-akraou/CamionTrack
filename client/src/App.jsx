import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Layout />}>
            </Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={['driver']} />}>
            <Route path="/driver" element={<Layout />}>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
