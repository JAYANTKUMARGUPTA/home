import React, { useState } from "react";
import Layout from "../../components/Layout";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("English");

  // Backup data handler
  const handleBackup = () => {
    // Logic to backup data (triggering API call to the backend)
    alert("Backup Data initiated!");
  };

  // Restore data handler
  const handleRestore = () => {
    // Logic to restore data (triggering API call to the backend)
    alert("Restore Data initiated!");
  };

  // Save profile settings (update username, password, and language)
  const handleSaveSettings = () => {
    // In a real application, these values would be saved through an API
    alert(`Settings saved: \nUsername: ${username}\nPassword: ${password}\nLanguage: ${language}`);
  };

  // Change language handler
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Logic to switch languages across the UI (this could involve using a localization library)
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Backup and Restore Section */}
        <button
          onClick={handleBackup}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Backup Data
        </button>
        <button
          onClick={handleRestore}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Restore Data
        </button>

        {/* Profile Management Section */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Update Username"
          className="border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Update Password"
          className="border p-2 rounded"
        />

        {/* Language Selection Section */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border p-2 rounded col-span-2"
        >
          <option value="English">English</option>
          <option value="French">French</option>
        </select>

        {/* Save Settings Button */}
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 text-white px-4 py-2 rounded col-span-2"
        >
          Save Settings
        </button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
