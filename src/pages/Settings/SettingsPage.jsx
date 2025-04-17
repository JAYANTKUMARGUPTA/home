import React from "react";
import Layout from "../../components/Layout";

const SettingsPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Backup Data</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Restore Data</button>
        <input placeholder="Update Username" className="border p-2 rounded" />
        <input placeholder="Update Password" type="password" className="border p-2 rounded" />
        <select className="border p-2 rounded col-span-2">
          <option>English</option>
          <option>French</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded col-span-2">Save Settings</button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
