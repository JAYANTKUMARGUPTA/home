import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/property", label: "Property" },
    { path: "/unit-types", label: "Unit Types" },
    { path: "/owners", label: "Owners" },
    { path: "/committee", label: "Committee" },
    { path: "/budget/regular", label: "Regular Budget" },
    { path: "/budget/exceptional", label: "Exceptional Budget" },
    { path: "/reports", label: "Reports" },
    { path: "/documents", label: "Documents" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      {links.map((link, i) => (
        <Link
          key={i}
          to={link.path}
          className="block py-2 px-3 rounded hover:bg-gray-200"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
