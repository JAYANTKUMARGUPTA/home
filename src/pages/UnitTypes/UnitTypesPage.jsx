import React, { useState } from "react";
import Layout from "../../components/Layout";

const UnitTypesPage = () => {
  const [unitTypes, setUnitTypes] = useState([]);
  const [formData, setFormData] = useState({ name: "", fee: "" });
  const [errors, setErrors] = useState({ name: "", fee: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", fee: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Unit type is required";
      isValid = false;
    }
    if (!formData.fee || formData.fee <= 0) {
      newErrors.fee = "Valid monthly fee is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddUnitType = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUnitTypes([...unitTypes, { id: Date.now(), ...formData }]);
      setFormData({ name: "", fee: "" });
    }
  };

  const handleGeneratePDF = () => {
    // Placeholder for PDF generation logic
    console.log("Generating PDF for:", unitTypes);
    alert("PDF generation triggered! Check console for data.");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Unit Types</h2>
        
        {/* Form */}
        <form
          onSubmit={handleAddUnitType}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Type
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Big Apartment"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="fee" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Fee ($)
            </label>
            <input
              id="fee"
              name="fee"
              type="number"
              min="0"
              step="0.01"
              value={formData.fee}
              onChange={handleInputChange}
              placeholder="e.g. 1000"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.fee ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.fee}
              aria-describedby={errors.fee ? "fee-error" : undefined}
            />
            {errors.fee && (
              <p id="fee-error" className="text-red-500 text-sm mt-1">
                {errors.fee}
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Add Unit Type
            </button>
            <button
              type="button"
              onClick={handleGeneratePDF}
              disabled={unitTypes.length === 0}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Generate PDF
            </button>
          </div>
        </form>

        {/* Unit Types List */}
        {unitTypes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Added Unit Types</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Unit Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Monthly Fee ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {unitTypes.map((unit) => (
                    <tr key={unit.id} className="border-t">
                      <td className="px-6 py-4 text-gray-600">{unit.name}</td>
                      <td className="px-6 py-4 text-gray-600">{parseFloat(unit.fee).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UnitTypesPage;