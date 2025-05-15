import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiShoppingCart, 
  FiSettings, 
  FiMessageSquare, 
  FiBook,
  FiLogOut 
} from "react-icons/fi";
import { toast } from "react-toastify";

import DashboardSection from "./DashboardSection";
import ProfileSection from "./ProfileSection";
import SessionsSection from "./SessionsSection";
import TrainingMaterialsSection from "./TrainingMaterialsSection";
import FeedbackSection from "./FeedbackSection";
import SettingsSection from "./SettingsSection";

export default function CustomerDashboard() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  
  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'customer') {
      // Redirect to login if not authenticated as customer
      navigate('/login');
    }
  }, [navigate]);

  // Handle logout function
  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    
    // Show success message
    toast.success('Successfully logged out!');
    
    // Redirect to login page
    navigate('/login');
  };

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: <FiHome className="mr-2" /> },
    { name: "Profile", icon: <FiUser className="mr-2" /> },
    { name: "Sessions", icon: <FiShoppingCart className="mr-2" /> },
    { name: "Materials", icon: <FiBook className="mr-2" /> },
    { name: "Feedback", icon: <FiMessageSquare className="mr-2" /> },
    { name: "Settings", icon: <FiSettings className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Horizontal Navigation */}
      <nav className="bg-blue-800 px-4 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Tharuka Learners</span>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 pb-2 mr-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                    active === item.name ? "bg-blue-600" : "hover:bg-blue-700"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Section Title */}
        <h1 className="text-3xl font-bold mb-6">{active}</h1>

        {/* Active Section Component */}
        <div className="bg-gray-800 p-5 rounded-lg">
          {active === "Dashboard" && <DashboardSection />}
          {active === "Profile" && <ProfileSection />}
          {active === "Sessions" && <SessionsSection />}
          {active === "Materials" && <TrainingMaterialsSection />}
          {active === "Feedback" && <FeedbackSection />}
          {active === "Settings" && <SettingsSection />}
        </div>
      </main>
    </div>
  );
}