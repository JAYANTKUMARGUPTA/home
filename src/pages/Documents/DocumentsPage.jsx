import React from "react";
import Layout from "../../components/Layout";

const DocumentsPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Documents</h2>
      <form className="mb-4 flex gap-4">
        <input type="file" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
      <input type="text" placeholder="Search documents..." className="border p-2 rounded w-full mb-4" />
      <div className="bg-white p-4 shadow rounded">[Document list with filter options will go here]</div>
    </Layout>
  );
};

export default DocumentsPage;
