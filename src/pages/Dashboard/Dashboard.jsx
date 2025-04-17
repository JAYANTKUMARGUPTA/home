import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newProperty, setNewProperty] = useState({
    name: "",
    units: "",
    status: "Active"
  });

  const modules = [
    { name: "Property Details", path: "/property", icon: "🏠", color: "bg-blue-100 text-blue-800" },
    { name: "Unit Types", path: "/unit-types", icon: "🏢", color: "bg-green-100 text-green-800" },
    { name: "Owners List", path: "/owners", icon: "👤", color: "bg-purple-100 text-purple-800" },
    { name: "Committee Details", path: "/committee", icon: "👥", color: "bg-yellow-100 text-yellow-800" },
    { name: "Regular Budget", path: "/budget/regular", icon: "💰", color: "bg-red-100 text-red-800" },
  { name: "Exceptional Budget", path: "/budget/exceptional", icon: "💸", color: "bg-orange-100 text-orange-800" },,
    { name: "Reports", path: "/reports", icon: "📊", color: "bg-indigo-100 text-indigo-800" },
    { name: "Documents", path: "/documents", icon: "📄", color: "bg-pink-100 text-pink-800" },
    { name: "Settings", path: "/settings", icon: "⚙️", color: "bg-gray-100 text-gray-800" },
  ];

  const handlePropertyClick = (path) => {
    navigate(path);
  };

  const handleAddProperty = () => {
    if (newProperty.name && newProperty.units) {
      if (editingId !== null) {
        // Edit existing property
        setProperties(properties.map((property) =>
          property.id === editingId
            ? { ...property, ...newProperty, units: parseInt(newProperty.units) }
            : property
        ));
        setEditingId(null);
      } else {
        // Add new property
        setProperties([
          ...properties,
          {
            id: properties.length + 1,
            name: newProperty.name,
            units: parseInt(newProperty.units),
            status: newProperty.status,
          },
        ]);
      }

      setNewProperty({ name: "", units: "", status: "Active" });
      setShowPropertyForm(false);
    }
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const editProperty = (id) => {
    const propertyToEdit = properties.find(property => property.id === id);
    if (propertyToEdit) {
      setNewProperty({
        name: propertyToEdit.name,
        units: propertyToEdit.units.toString(),
        status: propertyToEdit.status
      });
      setEditingId(id);
      setShowPropertyForm(true);
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Property Management Dashboard</h2>
          <button
            onClick={() => {
              setShowPropertyForm(true);
              setEditingId(null);
              setNewProperty({ name: "", units: "", status: "Active" });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Property
          </button>
        </div>

        {/* Property Management Table */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Properties</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{property.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{property.units}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteProperty(property.id)}
                        className="text-red-600 hover:text-red-900 mr-3"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => editProperty(property.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add/Edit Modal */}
        {showPropertyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium mb-4">
                {editingId !== null ? "Edit Property" : "Add New Property"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                  <input
                    type="text"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter property name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
                  <input
                    type="number"
                    value={newProperty.units}
                    onChange={(e) => setNewProperty({ ...newProperty, units: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter number of units"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newProperty.status}
                    onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowPropertyForm(false);
                    setEditingId(null);
                    setNewProperty({ name: "", units: "", status: "Active" });
                  }}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProperty}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingId !== null ? "Save Changes" : "Add Property"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access Modules */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((module, i) => (
              <div
                key={i}
                onClick={() => handlePropertyClick(module.path)}
                className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${module.color} flex items-center`}
              >
                <span className="text-2xl mr-3">{module.icon}</span>
                <h3 className="font-medium">{module.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
