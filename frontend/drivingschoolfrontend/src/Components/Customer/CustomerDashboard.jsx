import { useState } from "react";
import { FiHome, FiUser, FiShoppingCart, FiSettings, FiCamera, FiMessageSquare } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";


// Dummy Data
const sessionData = [
  { name: "Jan", sessions: 2 },
  { name: "Feb", sessions: 3 },
  { name: "Mar", sessions: 5 },
  { name: "Apr", sessions: 7 },
  { name: "May", sessions: 6 },
  { name: "Jun", sessions: 8 },
];

const fullPayment = 500;
const paidAmount = 300;
const remainingPayment = fullPayment - paidAmount;

const paymentData = [
  { name: "Paid", value: paidAmount, color: "#4CAF50" },
  { name: "Remaining", value: remainingPayment, color: "#F44336" },
];

const attendanceData = [
  { date: "2025-03-01", customer: "John Doe" },
  { date: "2025-03-05", customer: "John Doe" },
  { date: "2025-03-10", customer: "John Doe" },
  { date: "2025-03-15", customer: "John Doe" },
  { date: "2025-03-20", customer: "John Doe" },
];

export default function CustomerDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [profileImage, setProfileImage] = useState(null);
  const [feedback, setFeedback] = useState({
    type: "Instructor",
    rating: 0,
    comments: "",
  });

  // Handlers
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleRatingClick = (ratingValue) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      rating: ratingValue,
    }));
  };

  const handleSubmitFeedback = () => {
    alert(`Feedback Submitted!\nType: ${feedback.type}\nRating: ${feedback.rating}\nComments: ${feedback.comments}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-xl font-bold">Tharuka Learners</h2>
        <nav className="mt-5">
          {[
            { name: "Dashboard", icon: <FiHome /> },
            { name: "Profile", icon: <FiUser /> },
            { name: "Sessions", icon: <FiShoppingCart /> },
            { name: "Feedback", icon: <FiMessageSquare /> },
            { name: "Settings", icon: <FiSettings /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 p-3 w-full rounded-lg ${
                active === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold">{active}</h1>

        {/* Dashboard */}
        {active === "Dashboard" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {[
                { title: "Total Bookings", value: "24", icon: "📅" },
                { title: "Pending Payments", value: "$120", icon: "💰" },
                { title: "Completed Sessions", value: "15", icon: "✅" },
                { title: "Next Class", value: "April 2", icon: "📆" },
              ].map((card) => (
                <div key={card.title} className="p-5 bg-gray-800 rounded-lg">
                  <div className="text-3xl">{card.icon}</div>
                  <h2 className="text-sm mt-2">{card.title}</h2>
                  <p className="text-xl font-bold">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-800 p-5 rounded-lg">
              <h2 className="text-lg font-semibold">Completed Training Sessions</h2>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={sessionData}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Area type="monotone" dataKey="sessions" stroke="#4F46E5" fill="#6366F1" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Profile */}
        {active === "Profile" && (
          <div className="mt-6 bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 rounded-full border-4 border-gray-500">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full rounded-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-full">
                    <FiUser size={50} />
                  </div>
                )}
                <label
                  htmlFor="upload-photo"
                  className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer"
                >
                  <FiCamera />
                </label>
                <input type="file" id="upload-photo" className="hidden" onChange={handleImageChange} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-400">Customer ID: #12345</p>
                <p className="mt-2">Last Attended Session: March 20, 2025</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-700 p-5 rounded-lg">
              <h2 className="text-lg font-semibold">Payment Details</h2>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie data={paymentData} dataKey="value" outerRadius={80} label>
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-green-400">Paid: ${paidAmount}</p>
                <p className="text-red-400">Remaining: ${remainingPayment}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-700 p-5 rounded-lg overflow-y-auto max-h-96">
              <h2 className="text-lg font-semibold">Attendance Records</h2>
              <table className="w-full mt-4 border border-gray-600">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3">Date</th>
                    <th className="p-3">Customer Name</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr key={index} className="border border-gray-600">
                      <td className="p-3">{record.date}</td>
                      <td className="p-3">{record.customer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Feedback */}
        {active === "Feedback" && (
  <div className="mt-6 bg-gray-800 p-6 rounded-lg">
    <h2 className="text-lg font-semibold">Submit Your Feedback</h2>
    <div className="mt-4">
      <label className="block text-sm">Feedback Type</label>
      <select
        name="type"
        value={feedback.type}
        onChange={handleFeedbackChange}
        className="w-full p-2 rounded bg-gray-700"
      >
        <option value="Instructor">Instructor</option>
        <option value="Sessions">Sessions</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="mt-4">
      <label className="block text-sm">Rating</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-xl ${
              feedback.rating >= star ? "text-yellow-400" : "text-gray-500"
            }`}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
    <div className="mt-4">
      <label className="block text-sm">Comments</label>
      <textarea
        name="comments"
        value={feedback.comments}
        onChange={handleFeedbackChange}
        className="w-full p-2 rounded bg-gray-700"
        rows="4"
      ></textarea>
    </div>
    <button
      onClick={handleSubmitFeedback}
      className="mt-4 bg-blue-600 px-4 py-2 rounded"
    >
      Submit Feedback
    </button>
  </div>
)}
</div>
</div>
  )}