import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import { tokens } from '../../theme';
import axios from 'axios';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiBookOpen, 
  FiDollarSign,
  FiFileText,
  FiUpload,
  FiSettings,
  FiUserPlus,
  FiMessageSquare,
  FiLogOut
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const API_BASE_URL = "http://localhost:8080/api";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // User state
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    role: "STAFF"
  });
  const [loading, setLoading] = useState(true);
  
  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  };

  // Headers for API requests
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
  };

  // Logout function
  const handleLogout = () => {
    // Remove auth tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    
    // Show success message
    toast.success('Successfully logged out');
    
    // Redirect to login page
    navigate('/login');
  };

  // Fetch current user info
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      
      try {
        const response = await axios.get(
          `${API_BASE_URL}/staff/me`,
          getAuthHeaders()
        );
        
        setCurrentUser({
          name: response.data.name || "Unknown User",
          role: response.data.role || "STAFF"
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        // Fallback to default values on error
        setCurrentUser({
          name: "Admin User", 
          role: "STAFF"      
        });
        setLoading(false);
      }
    };
    
    // Only fetch if we have a token
    if (getAuthToken()) {
      fetchCurrentUser();
    } else {
      setLoading(false);
      // If no token is found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Format role for display
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0) + role.slice(1).toLowerCase();
  };
  
  // Get first letter of name for avatar
  const getFirstLetter = (name) => {
    if (!name || name === "Loading...") return "?";
    return name.charAt(0).toUpperCase();
  };
  
  const navItems = [
    { icon: <FiHome />, label: 'Dashboard', path: '/staff/dashboard' },
    { icon: <FiUsers />, label: 'Customers', path: '/staff/customers' },
    { icon: <FiUserPlus />, label: 'Enrollments', path: '/staff/enrollments' },
    { icon: <FiCalendar />, label: 'Sessions', path: '/staff/sessions' },
    { icon: <FiMessageSquare />, label: 'Feedback', path: '/staff/feedback' },
    { icon: <FiBookOpen />, label: 'Programs', path: '/staff/training' },
    { icon: <FiDollarSign />, label: 'Payments', path: '/staff/payments' },
    { icon: <FiFileText />, label: 'Reports', path: '/staff/reports' },
    { icon: <FiUpload />, label: 'Documents', path: '/staff/documents' },
    { icon: <FiSettings />, label: 'Settings', path: '/staff/settings' },
  ];
  
  return (
    <Box 
      sx={{ 
        width: '250px',
        minHeight: '100vh',
        backgroundColor: colors.primary[400],
        padding: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '32px'
        }}
      >
        <Box 
          sx={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              color: colors.primary[500], 
              fontWeight: 'bold' 
            }}
          >
            T
          </Typography>
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            marginLeft: '12px', 
            fontWeight: 'bold',
            color: colors.grey[100]
          }}
        >
          Tharuka Admin
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
                backgroundColor: location.pathname === item.path 
                  ? colors.blueAccent[700] 
                  : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === item.path 
                    ? colors.blueAccent[700] 
                    : colors.blueAccent[800]
                }
              }}
            >
              <Box 
                sx={{ 
                  marginRight: '12px', 
                  fontSize: '18px',
                  color: colors.grey[100]
                }}
              >
                {item.icon}
              </Box>
              <Typography 
                sx={{ 
                  color: colors.grey[100]
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
      
      {/* User profile section with logout functionality */}
      <Box 
        sx={{ 
          marginTop: 'auto', 
          paddingTop: '32px', 
          borderTop: `1px solid ${colors.primary[500]}`,
          marginTop: '32px'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '16px'
          }}
        >
          <Box 
            sx={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: colors.blueAccent[700],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography sx={{ color: colors.grey[100] }}>
              {getFirstLetter(currentUser.name)}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: '12px', flexGrow: 1 }}>
            <Typography 
              sx={{ 
                fontWeight: 'medium',
                color: colors.grey[100]
              }}
            >
              {loading ? "Loading..." : currentUser.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: colors.grey[300]
              }}
            >
              {loading ? "" : formatRole(currentUser.role)}
            </Typography>
          </Box>
          <Tooltip title="Logout">
            <Button 
              onClick={handleLogout}
              sx={{ 
                minWidth: 'auto', 
                padding: '8px',
                color: colors.grey[300],
                '&:hover': {
                  backgroundColor: colors.redAccent[800],
                  color: colors.grey[100]
                }
              }}
            >
              <FiLogOut size={20} />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSidebar;