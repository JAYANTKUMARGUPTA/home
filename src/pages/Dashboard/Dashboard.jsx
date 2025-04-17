import React from "react";
import Layout from "../../components/Layout";

const Dashboard = () => {
  const modules = [
    { name: "Property Details", color: "bg-blue-100 text-blue-800" },
    { name: "Unit Types", color: "bg-green-100 text-green-800" },
    { name: "Owners List", color: "bg-purple-100 text-purple-800" },
    { name: "Committee Details", color: "bg-yellow-100 text-yellow-800" },
    { name: "Budgets", color: "bg-red-100 text-red-800" },
    { name: "Reports", color: "bg-indigo-100 text-indigo-800" },
    { name: "Documents", color: "bg-pink-100 text-pink-800" },
    { name: "Settings", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((module, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${module.color}`}
            >
              <h3 className="font-medium">{module.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;