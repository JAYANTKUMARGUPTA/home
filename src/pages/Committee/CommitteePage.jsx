import React from "react";
import Layout from "../../components/Layout";

const CommitteePage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Committee Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Owner Full Name" className="p-2 border rounded" />
        <input placeholder="Position (e.g. President)" className="p-2 border rounded" />
        <input placeholder="Digital Signature Name" className="p-2 border rounded" />
        <div className="col-span-2 flex gap-4 mt-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Assign Position</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Generate PDF</button>
        </div>
      </form>
    </Layout>
  );
};

export default CommitteePage;
