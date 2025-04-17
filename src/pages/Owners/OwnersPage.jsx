import React from "react";
import Layout from "../../components/Layout";

const OwnersPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Owners List</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Full Name" className="p-2 border rounded" />
        <input placeholder="Renter (Yes/No)" className="p-2 border rounded" />
        <input placeholder="Address" className="p-2 border rounded" />
        <input placeholder="Phone" className="p-2 border rounded" />
        <input placeholder="Email" className="p-2 border rounded" />
        <input placeholder="Bank Account No." className="p-2 border rounded" />
        <input placeholder="Unit Type" className="p-2 border rounded" />
        <input placeholder="Ownership Title No." className="p-2 border rounded" />
        <div className="col-span-2 flex gap-4 mt-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Owner</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Generate PDF</button>
        </div>
      </form>
    </Layout>
  );
};

export default OwnersPage;
