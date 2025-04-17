// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();

//   const links = [
//     { path: "/property", label: "Property Details" },
//     { path: "/unit-types", label: "Unit Types" },
//     { path: "/owners", label: "Owners List" },
//     { path: "/committee", label: "Committee Details" },
//     { path: "/budget/regular", label: "Budgets" },
//     { path: "/reports", label: "Reports" },
//     { path: "/documents", label: "Documents" },
//     { path: "/settings", label: "Settings" },
//   ];

//   return (
//     <aside
//       className={`fixed top-0 left-0 z-50 bg-gray-100 h-full w-64 p-4 transition-transform duration-300 transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } md:relative md:translate-x-0 md:block`}
//     >
//       <div className="flex justify-end">
//         <button onClick={toggleSidebar}>✖</button>
//       </div>
//       {links.map((link, i) => (
//         <Link
//           key={i}
//           to={link.path}
//           onClick={toggleSidebar}
//           className={`block px-3 py-2 rounded mt-2 ${
//             location.pathname === link.path
//               ? "bg-blue-200 font-medium"
//               : "hover:bg-gray-200"
//           }`}
//         >
//           {link.label}
//         </Link>
//       ))}
//     </aside>
//   );
// };

// export default Sidebar;
