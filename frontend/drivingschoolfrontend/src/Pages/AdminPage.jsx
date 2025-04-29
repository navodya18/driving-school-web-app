import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "../Components/Admin/contexts/theme-context.jsx";
import Layout from "../Components/Admin/routes/layout.jsx";
import DashboardPage from "../Components/Admin/routes/dashboard/page.jsx";
import Calendar from "../Components/Admin/calendar/calendar.jsx";
import Customer from "../Components/Admin/customer/customer.jsx";


const AdminPage = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
            {
              path: "/analytics",
              element: <h1 className="title">Analytics</h1>,
            },
            {
              path: "/customers",
              element: (
                <>
                  <h1 className="title">Customers</h1>
                  <Customer />
                </>
              ),
                      
            },
            {
              path: "/new-customer",
              element: <h1 className="title">New Customer</h1>,
            },
            {
              path: "/verified-customers",
              element: <h1 className="title">Verified Customers</h1>,
            },
            {
              path: "/products",
              element: <h1 className="title">Products</h1>,
            },
            {
              path: "/inventory",
              element: <h1 className="title">Inventory</h1>,
            },
            {
              path: "/settings",
              element: <h1 className="title">Setting</h1>,
            },
            {
              path: "analytics/calendar",
              element: <Calendar />, // ✅ Calendar component added here
            },
          ],
        },
      ]);
    
      return (
        <ThemeProvider storageKey="theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      );
    }

export default AdminPage