import React from "react";
import Layout from "../../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "Property Details",
          "Unit Types",
          "Owners List",
          "Committee Details",
          "Budgets",
          "Reports",
          "Documents",
          "Settings",
        ].map((module, i) => (
          <div
            key={i}
            className="bg-white shadow p-4 rounded hover:shadow-md transition"
          >
            {module}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
