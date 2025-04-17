import React, { useState } from "react";
import Layout from "../../components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CommitteePage = () => {
  const [committee, setCommittee] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    signatureName: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.position) newErrors.position = "Position is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCommittee([...committee, { id: Date.now(), ...formData }]);
    setFormData({ name: "", position: "", signatureName: "" });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Committee Details", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Full Name", "Position"]],
      body: committee.map(member => [member.name, member.position]),
    });

    const president = committee.find(m => m.position.toLowerCase() === "president");

    if (president && president.signatureName) {
      doc.setFont("courier", "italic");
      doc.setFontSize(16);
      doc.text(`\nPresident Signature:\n\n${president.signatureName}`, 14, doc.lastAutoTable.finalY + 20);
    }

    doc.save("committee-details.pdf");
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Committee Details</h2>

        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-6">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Owner Full Name"
              className="p-2 border rounded w-full"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position (e.g. President)"
              className="p-2 border rounded w-full"
            />
            {errors.position && <p className="text-sm text-red-600 mt-1">{errors.position}</p>}
          </div>
          <div className="md:col-span-2">
            <input
              name="signatureName"
              value={formData.signatureName}
              onChange={handleChange}
              placeholder="Digital Signature Name"
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="col-span-2 flex gap-4 mt-2 justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Assign Position
            </button>
            <button type="button" onClick={generatePDF} className="bg-green-600 text-white px-4 py-2 rounded">
              Generate PDF
            </button>
          </div>
        </form>

        {committee.length > 0 && (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Current Committee</h3>
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Position</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Digital Signature</th>
                </tr>
              </thead>
              <tbody>
                {committee.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="px-4 py-2 text-gray-700">{member.name}</td>
                    <td className="px-4 py-2 text-gray-700">{member.position}</td>
                    <td className="px-4 py-2 text-gray-700 italic font-serif">
                      {member.signatureName || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CommitteePage;
