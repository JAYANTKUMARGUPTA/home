// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   return (
//     <div>
//       <Navbar toggleSidebar={toggleSidebar} />
//       <div className="flex">
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <main className="flex-1 p-6 bg-gray-50 md:ml-64 min-h-screen">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <button 
          onClick={toggleSidebar}
          className="text-2xl p-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="text-xl md:text-2xl font-bold ml-auto">
          HOA Management System
        </h1>
        <div className="w-8"></div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: "/dashboard", label: "Home" },  // Added Home link
    { path: "/property", label: "Property Details" },
    { path: "/unit-types", label: "Unit Types" },
    { path: "/owners", label: "Owners List" },
    { path: "/committee", label: "Committee Details" },
    { path: "/budget/regular", label: "Budgets" },
    { path: "/reports", label: "Reports" },
    { path: "/documents", label: "Documents" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={toggleSidebar}
            className="text-2xl p-1 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`
                  }
                  onClick={toggleSidebar}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;