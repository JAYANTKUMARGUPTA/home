import React from "react";
import Layout from "../../components/Layout";

const PropertyPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Property Name" className="p-2 border rounded" />
        <input placeholder="Address" className="p-2 border rounded" />
        <input placeholder="Ownership Title" className="p-2 border rounded" />
        <input placeholder="Association Name" className="p-2 border rounded" />
        <input placeholder="Map Location" className="p-2 border rounded" />
        <input placeholder="Currency" className="p-2 border rounded" />
        <input type="file" className="p-2 border rounded" />
        <div className="col-span-2 flex gap-4 mt-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Generate PDF
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default PropertyPage;
