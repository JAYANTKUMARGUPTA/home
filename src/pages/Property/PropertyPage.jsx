import React, { useState } from "react";
import Layout from "../../components/Layout";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PropertyPage = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    ownershipTitle: "",
    associationName: "",
    mapLocation: "",
    currency: "",
    document: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Property details saved (mock only).");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Property Details", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Property Name", formData.propertyName],
        ["Address", formData.address],
        ["Ownership Title", formData.ownershipTitle],
        ["Association Name", formData.associationName],
        ["Map Location", formData.mapLocation],
        ["Currency", formData.currency],
      ],
    });

    // Add Barcode
    const canvas = document.querySelector("#barcode canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 14, doc.lastAutoTable.finalY + 10, 100, 30);
    }

    doc.save("property-details.pdf");
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Property Details</h2>
          <p className="text-gray-600 mt-2">Manage your property information</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Property Name</label>
            <input
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter property name"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Ownership Title</label>
            <input
              name="ownershipTitle"
              value={formData.ownershipTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ownership title"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Association Name</label>
            <input
              name="associationName"
              value={formData.associationName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter association name"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Map Location</label>
            <input
              name="mapLocation"
              value={formData.mapLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter map coordinates or link"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select currency</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="INR">Indian Rupee (₹)</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Property Document (optional)</label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          {/* Barcode Preview */}
          <div className="md:col-span-2 mt-4 space-y-4">
            <p className="text-gray-600 text-sm">Barcode Preview:</p>
            <div id="barcode">
              {formData.propertyName && <Barcode value={formData.propertyName} />}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Save Details
            </button>
            <button
              type="button"
              onClick={generatePDF}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Generate PDF
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PropertyPage;
