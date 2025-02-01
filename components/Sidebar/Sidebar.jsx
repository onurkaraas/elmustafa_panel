import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';

function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {/* Navigation items */}
          <a href="#" className="nav-link">
            Dashboard
          </a>
          {/* Add more nav items */}
        </nav>

        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="sign-out-btn">
          <FiLogOut className="sign-out-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
