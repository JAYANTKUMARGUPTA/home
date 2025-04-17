import React, { useState } from "react";
import Layout from "../../components/Layout";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      const newDocument = {
        name: selectedFile.name,
        size: selectedFile.size,
        date: new Date(),
        file: selectedFile, // In a real app, upload this file to your backend
      };
      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      setSelectedFile(null);
    }
  };

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Documents</h2>
      
      <form className="mb-4 flex gap-4">
        <input
          type="file"
          className="border p-2 rounded"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </form>

      <input
        type="text"
        placeholder="Search documents..."
        className="border p-2 rounded w-full mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="bg-white p-4 shadow rounded">
        <ul>
          {filteredDocuments.length === 0 ? (
            <li>No documents found</li>
          ) : (
            filteredDocuments.map((doc, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{doc.name}</span>
                <span>{(doc.size / 1024).toFixed(2)} KB</span>
                <span>{doc.date.toLocaleString()}</span>
                <button className="text-blue-600">Download</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
