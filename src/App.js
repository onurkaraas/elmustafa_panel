import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/config';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import LiveStreams from './pages/LiveStreams/LiveStreams';
import ContentLibrary from './pages/ContentLibrary/ContentLibrary';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import TVStreamView from './components/TVApp/TVStreamView';
import MobileStreamView from './components/MobileApp/MobileStreamView';
import './App.css';
import './styles/globals.css';
import './styles/pages.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      {user && <Sidebar />}
      <main className={user ? 'dashboard-container' : ''}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
          <Route path="/live-streams" element={user ? <LiveStreams /> : <Navigate to="/login" />} />
          <Route
            path="/content-library"
            element={user ? <ContentLibrary /> : <Navigate to="/login" />}
          />
          <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/tv-app" element={user ? <TVStreamView /> : <Navigate to="/login" />} />
          <Route
            path="/mobile-app"
            element={user ? <MobileStreamView /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
